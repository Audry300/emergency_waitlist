import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

interface Patient{
    name:string
    code:string
    estimatedWait:number
    position:number
    severity:number
}

export const getPatientsInTheWaitingList = async():Promise<Patient[]> =>{
    const patients = await prisma.patient.findMany({
        select:{
            name:true,
            code:true,
            position:true,
            severity:true,
            estimatedWait:true

        },
        where:{
            status:'WAITING'
        }
    })

    return patients;
}

const updateWaitListAfterPatientRemoval = async (patient:Patient):Promise<void>=>{
    try{
        await prisma.patient.updateMany({
            where:{
                position:{gt:patient.position}
            },
            data:{
                position:{decrement:1},
                estimatedWait:{decrement:patient.estimatedWait}
            }
        })

    } catch(error){
        console.error('Error updating the waiting list after the patient removal',error)
    }

}

export const RemovePatientFromTheWaitList = async (patient:Patient):Promise<string> => {
    

    try{
        const {name, code} = patient

        await prisma.patient.update(
            {
                where:{
                    name:name,
                    code:code
                },
                data:{
                    status:'TREATED'
                }
            }
        )

        await updateWaitListAfterPatientRemoval(patient)

        return 'success'

    }catch(error){
        console.error('Error updating the patient',error)
        return 'error'

    }
    
}
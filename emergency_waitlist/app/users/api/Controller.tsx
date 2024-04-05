import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

interface Patient{
    name:string
    code:string
    estimatedWait?:number

}

export const getUserInfo = async (patient:Patient):Promise<Patient|null> =>{

    try{
        const {code,name} = patient;

        const patientInfo = await prisma.patient.findFirst({
            where:{
                name:name,
                code:code
            },
            select:{
                name:true,
                code:true,
                estimatedWait:true

            }
        })

        return patientInfo

    } catch(error){
        console.error('Patient with the provided information was not found', error)
        return null
    }
    
}
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

interface PatientData{
    name: string;
    estimatedWait?:number;
    severity:number;
    
}

interface Patient{
    code:string;
    estimatedWait:number;
    position:number
}

const generateCode = async ():Promise<string>=>{
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = ''

    for (let i=0; i<3;i++){
        const index = Math.floor(Math.random()*char.length);
        code += char.charAt(index)
    }

    return code;

}

async function generateUniqueCode(): Promise<string> {
    let code = await generateCode();
    while (!(await isCodeUnique(code))) {
      code = await generateCode();
    }
    return code;
}

async function getCountOfWaitingList():Promise<number>{
    const count = await prisma.patient.count({
        where:{
            status:'WAITING'
        }
    })
    return count;
}

async function isCodeUnique(code: string): Promise<boolean> {
    const existingPatient = await prisma.patient.findFirst({
      where: {
        code: code,
      },
    });
    return !existingPatient;
  }



export const addPatient = async (patientData:PatientData):Promise<Patient> => {
   

    try{
        const {name, severity} = patientData;
        const code = await generateUniqueCode();
        const waitingListCount = await getCountOfWaitingList()

        const patientsThatStayAhead = await prisma.patient.findMany({
            where:{
                status:'WAITING',
                createdAt:{lte:new Date(Date.now() - 10*60*1000)}
            },
            orderBy:{
                position:'asc'
            },
            select:{
                severity:true,
                estimatedWait:true
            }


        })

        const lastPatientThatStayAhead=patientsThatStayAhead[patientsThatStayAhead.length-1]

        const lastPatientEstimatedTreatmentTime:number = lastPatientThatStayAhead.severity*5

        const patientsToMoveBack = await prisma.patient.findMany({
            where:{
                status:'WAITING',
                severity:{lt:severity},
                createdAt:{gte:new Date(Date.now() - 10*60*1000)}
            },
            orderBy:{
                createdAt:'asc'
            }
        })

        

        const position = waitingListCount + 1 -patientsToMoveBack.length


        

        const createdPatient = await prisma.patient.create({
            data:{
                name:name,
                estimatedWait:lastPatientThatStayAhead.estimatedWait+lastPatientEstimatedTreatmentTime,
                severity:severity,
                position:position,
                code:code
            },
            select:{
                code:true,
                estimatedWait:true,
                position:true,
                severity:true
            }
        })
        const estimatedTreatmentTimeNewPatient:number = createdPatient.severity*5 // I assume it takes 5min per level of severity to treat an injury

        // Patients with lesser severity move back to make room for the new one
        for (const patient of patientsToMoveBack){
            await prisma.patient.update({
                where:{id:patient.id},
                data:{
                    position:patient.position+1,
                    estimatedWait:patient.estimatedWait + estimatedTreatmentTimeNewPatient
                    

                }
            })
        }

        return createdPatient;

    }catch(error){
        console.error('Error adding patient', error)
        throw error;
    }

}
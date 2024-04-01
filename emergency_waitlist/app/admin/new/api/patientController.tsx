import { PatientStatus, PrismaClient } from '@prisma/client'

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

        

        const createdPatient = await prisma.patient.create({
            data:{
                name:name,
                estimatedWait:10,
                severity:severity,
                position:waitingListCount+1,
                code:code
            },
            select:{
                code:true,
                estimatedWait:true,
                position:true,
            }
        })

        return createdPatient;

    }catch(error){
        console.error('Error adding patient', error)
        throw error;
    }

}
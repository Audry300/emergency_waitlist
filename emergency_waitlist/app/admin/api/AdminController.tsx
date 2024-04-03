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
import prisma from '../../../../prisma/prismaClient'

interface PatientData{
    name: string;
    estimatedWait?:number;
    severity:number;
    
}

interface Patient{
    code:string;
    estimatedWait:number;
    position:number
    severity:number
    
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

async function getCountOfWaitingList():Promise<{waitingListCount:number;lastPatient?:Patient}>{
    const waitingListCount = await prisma.patient.count({
        where:{
            status:'WAITING'
        }
    })

    const lastPatient = await prisma.patient.findFirst({
        where:{
            status:'WAITING'
        },
        orderBy:{
            position:'desc'
        }
    })
    return {waitingListCount,lastPatient:lastPatient?? undefined};
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
        const {waitingListCount,lastPatient} = await getCountOfWaitingList()
        
        const patientsThatStayAhead = await prisma.patient.findMany({
            where:{
                status:'WAITING',
                OR:[
                    {
                        createdAt:{lte:new Date(Date.now() - 10*60*1000)}
                    },
                    {
                        severity:{gte:severity}
                    }
                ]
            },
            orderBy:{
                position:'asc'
            },
            select:{
                severity:true,
                estimatedWait:true
            }


        })

        let estimatedWait:number=0;

        if (patientsThatStayAhead.length > 0){
           

            const lastPatientThatStayAhead=patientsThatStayAhead[patientsThatStayAhead.length-1]
            const lastPatientEstimatedTreatmentTime:number = lastPatientThatStayAhead.severity*5
            
            estimatedWait = lastPatientThatStayAhead.estimatedWait+lastPatientEstimatedTreatmentTime
            

        }
        
        else if(waitingListCount>0 && lastPatient){
            
            const lastPatientEstimatedTreatmentTime:number = lastPatient.severity*5
            estimatedWait = lastPatient.estimatedWait+lastPatientEstimatedTreatmentTime
            
        }
        

    
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
                estimatedWait:estimatedWait,
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
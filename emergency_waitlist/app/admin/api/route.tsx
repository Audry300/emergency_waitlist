import {getPatientsInTheWaitingList,RemovePatientFromTheWaitList} from './AdminController'


export async function GET(){
    try{
        
        const response = await getPatientsInTheWaitingList()
        const data = response.map(patient => JSON.stringify(patient));
        return Response.json({data})

    } catch(error){
        console.error('Error retrieving patients on the emergency waiting list',error);
        return Response.json({error:'Failed to retrieve patients on the emergency waiting list'})
        
    }
}

export async function POST (req:Request){
    try{
        const patientData = await req.json();
        const response = await RemovePatientFromTheWaitList(patientData)
        return Response.json(response);

    }catch(error){
        console.error('Error updating waiting list',error);
        return Response.json({error:'Failed to update the waiting list'})

    }
}
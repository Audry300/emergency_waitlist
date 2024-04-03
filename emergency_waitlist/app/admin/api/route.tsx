import {getPatientsInTheWaitingList} from './AdminController'

export async function GET(){
    try{
        
        const response = await getPatientsInTheWaitingList()
        const data = response.map(patient => JSON.stringify(patient));
        return Response.json({data})

    } catch(error){
        console.error('Error retrieving patients on the emergency waiting list',error);
        return Response.json({error:'Failed retrieve patients on the emergency waiting list'})
        
    }
}
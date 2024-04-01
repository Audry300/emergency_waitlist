import { NextApiRequest, NextApiResponse } from 'next';
import { addPatient } from './patientController';


export async function POST(req:Request){
    try{
        const patientData = await req.json();
        const responseData = await addPatient(patientData)
        return Response.json({message:'Patient successfully added to the emergency waiting list', responseData})

    } catch(error){
        console.error('Error adding patient to the emergency waiting list',error);
        return Response.json({error:'Failed to add patient'})
        

    }
}

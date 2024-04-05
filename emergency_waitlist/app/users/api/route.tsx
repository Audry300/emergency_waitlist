import {getUserInfo} from './Controller'

export const POST = async (req:Request)=>{
    try{
       
        const patientData = await req.json()
        const response  = await getUserInfo(patientData)

        if(response === null){
            return Response.json({message:"The patient was not found"})
        }

        return Response.json(response)

    }catch(error){
        throw error

    }
}
'use client'
import React,{useEffect, useState} from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import ConfirmationCard from '../components/ConfirmationCard'
import AddButton from '../components/AddButton';

interface Patient{
  name:string
  code:string
  estimatedWait:number
  position:number
  severity:number
}

const AdminPage:React.FC=({})=> {

  const [loading, setLoading] = useState<boolean>(true)
  const [patients,setPatients] = useState<Patient[]>();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);


  useEffect(()=>{
    const fetchInitialData = async () =>{
      const response = await fetch('/admin/api',{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
        }
       
      }); 

      const res = await response.json();
      const data = res.data.map((patient:string) => JSON.parse(patient))
      setPatients(data);
      setLoading(false);
    }

    fetchInitialData()
    
  },[])


const handleRowClick = (patient: Patient, index: number) => {
    
  if(index === 0){
    setSelectedPatient(patient);
  }
};

const handleCloseConfirmation = () => {
  setSelectedPatient(null);
};

const handleConfirmation = async () => {
  try {
    if(selectedPatient){
      const response = await fetch('/admin/api',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(selectedPatient)
       
      }); 
      const res = await response.json();

      if(res=='success'){
        setSelectedPatient(null)
        location.reload();

      }
    }else{
      console.error('Error while removing patient from the waiting list')
    }
  }
  catch(error){
    console.error('Error occurred while deleting patient', error);
  }
  
}
  

return (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    {loading ? (
      <Typography variant="h5">Loading...</Typography>
    ) : (
      <div style={{ minWidth: '800px' }}>
        <TableContainer style={{marginTop:'10px', marginBottom:'10px'}} component={Paper}>
          <Table >
            <TableHead style={{background:'grey' }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Estimated Waiting time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ cursor: 'pointer' }}>
              {patients && patients.map((patient, index) => (
                <TableRow 
                  key={index} 
                  onClick={() => handleRowClick(patient, index)}
                  style={{ cursor: 'pointer' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'lightgrey'; 
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = ''; 
                      }}

                >
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.code}</TableCell>
                  <TableCell>{`${patient.estimatedWait} min`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {selectedPatient && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <ConfirmationCard
              name={selectedPatient.name}
              code={selectedPatient.code}
              handleConfirmation={handleConfirmation}
              handleCloseConfirmation={handleCloseConfirmation}
            />
          </div>
        )}
        <div style={{ position: 'absolute', top: 0, right: 0, marginTop: '20px', marginRight: '85px' }}>
        <AddButton  />
        </div>
        
      </div>
    )}
  </div>
);
}

export default AdminPage



'use client'
import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React,{useEffect, useState} from 'react'


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
  const [checked,setChecked] = useState<boolean>(false);

  const handleCheckBoxClick = () => {
      setChecked(true);
  }

  const handleRowClick = (patient: Patient, index: number) => {
    
    if(index === 0){
      console.log('Clicked on row:', patient);
    }
};

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

  return (
    <div>
      {loading?(
        <Typography variant="h5">Loading...</Typography>
      ):(
        
                <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Code</TableCell>
                      <TableCell>Estimated Wait</TableCell>
                      <TableCell>Position</TableCell>
                      <TableCell>Severity</TableCell>
                      <TableCell>Checkbox</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody component={TableRow}  style={{ cursor: 'pointer' }}>
                    {patients && patients.map((patient, index) => (
                      <TableRow key={index} onClick={() => handleRowClick(patient, index)}>
                        <TableCell>{patient.name}</TableCell>
                        <TableCell>{patient.code}</TableCell>
                        <TableCell>{`${patient.estimatedWait} min`}</TableCell>
                        <TableCell>{patient.position}</TableCell>
                        <TableCell>{patient.severity}</TableCell>
                        <TableCell>
                        {index === 0 ? <Checkbox checked={checked} onChange={() => setChecked(!checked)} /> : null}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
    </div>
  )
}

export default AdminPage



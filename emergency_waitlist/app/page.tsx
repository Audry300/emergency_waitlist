
'use client'
import { Grid, Typography, TextField, Button, Container, Paper} from '@mui/material';
import React, { useState,useEffect } from 'react'

interface Patient{
  name:string
  code:string
  estimatedWait?:number

}

const Home:React.FC = ()=> {

  const [name,setName] = useState('')
  const [code,setCode] = useState('')
  const [patientData,setPatientData]=useState<Patient | null>(null)
  const [error,setError]=useState<string>('');



  const fetchData = async () => {
    try{
      const response = await fetch('users/api',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({name,code})
      })

      

      const data = await response.json();

      if (data.message){
        setError(data.message)
        return;
      }else{
        setError('')
        setPatientData(data);

      }
      
      

    }catch(error){
      console.error('There has a been an error while retrieving user info', error)
    }

    

  }

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    fetchData();
  }
  
    return (
      <div style={{padding:'100px'}}>
      <Container maxWidth="sm" style={{ height: '50vh' }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '30vh' , padding: '30px', border: '2px solid #000'}}>
          {patientData===null && <Grid item xs={12}>
            <form onSubmit={handleSubmit} method="post" action="" autoComplete='off'>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                autoComplete="off" 
                required
              />
              <TextField
                label="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                autoComplete="new-password" 
                type="password"
                required
              />
              <Button type="submit" variant="contained" color="primary" style={{ backgroundColor: '#1976d2', color: '#fff' }} fullWidth>
                Login
              </Button>
            </form>
          </Grid>}
          {error && (
            <Grid item xs={12}>
              <Typography variant="body1" color="error" align="center">
                {error}
              </Typography>
            </Grid>
            
          )}
          {patientData && (
            <Grid item xs={12}>
               <Paper elevation={3}  style={{ padding: '20px' }} >
              <Typography variant="h6" align="center" gutterBottom>
                Patient Information
              </Typography>
              <Typography>Name: {patientData.name}</Typography>
              <Typography>Code: {patientData.code}</Typography>
              {patientData.estimatedWait && <Typography>Estimated Wait Time: {patientData.estimatedWait} minutes</Typography>}
              <Button type="submit" onClick={()=>{setPatientData(null)}} variant="contained" color="primary" style={{ backgroundColor: '#1976d2', color: '#fff' }} fullWidth>
                Logout
              </Button>
              </Paper>
            </Grid>
          )}
          
        </Grid>
      </Container >
      </div>
    );

}
export default Home



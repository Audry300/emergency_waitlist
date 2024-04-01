'use client'

import React,{useEffect,useState} from 'react'
import { TextField, Button, Slider, Typography, Container, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';


const  NewUser:React.FC = ()=> {

  
  const [name, setName] = useState<string>('');
  const [severity, setSeverity] = useState<number>(1);
  const [code,setCode] = useState<number>();
  const [waitPosition, setWaitPosition] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };


  const handleSeverityChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setSeverity(newValue);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try{
      
       const response = await fetch('/admin/new/api',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({name, severity}),
      }); 

      const res = await response.json();
      
      const {responseData} = res;
      setCode(responseData.code);
      setWaitPosition(responseData.position);
      setIsOpen(true); 
      
    }catch(error){
      console.error('Error adding patient', error);
    }
    
  };

  const handleClose = () =>{
    setIsOpen(false); 
  }

  return (
    <Container maxWidth="sm">
<form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={handleNameChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Typography id="severity-slider" gutterBottom>
          Severity of injury
        </Typography>
        <Slider
          value={severity}
          onChange={handleSeverityChange}
          aria-labelledby="severity-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
        />
        <Button type="submit" variant="contained" color="primary" style={{ backgroundColor: '#1976d2' }}>
          Add Patient
        </Button>
      </form>
      
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Patient added to the waitlist!</DialogTitle>
        <DialogContent>
          <Typography>Name: {name}</Typography>
          <Typography>Severity: {severity}</Typography>
          <Typography>Code: {code}</Typography>
          <Typography>Position: {waitPosition}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      </Container>

  )
}


export default NewUser;

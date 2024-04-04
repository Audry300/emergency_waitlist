import React from 'react'
import { Card, CardContent, Button, Typography } from '@mui/material';

interface PatientInformation{
    name: string,
    code: string
    handleConfirmation: () => void;
    handleCloseConfirmation:()=>void
}

const ConfirmationCard:React.FC<PatientInformation> = ({name,code, handleConfirmation,handleCloseConfirmation}:PatientInformation)=>{
    
    const handleConfirm = () => {
        handleConfirmation();
    }

    const handleCancel = () => {
        handleCloseConfirmation();
        
    }

    return (
        <Card>
          <CardContent>
            <Typography variant="h5">Confirm Patient Treatment</Typography>
            <Typography variant="body1">
              Do you want to confirm that patient <strong>{name}</strong> with code <strong>{code}</strong> has been treated?
            </Typography>
            <div style={{ marginTop: '20px' }}>
              <Button variant="contained" color="primary" style={{ backgroundColor: '#1976d2', color: '#fff' }} onClick={handleConfirm}>
                Confirm
              </Button>
              <Button variant="contained"  color="primary" style={{ backgroundColor: '#f44336', color: '#ffffff', marginLeft: '10px'}} onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      );

}

export default ConfirmationCard
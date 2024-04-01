'use client'

import React,{useState} from 'react'
import { Card, CardContent, Typography, Box, Checkbox} from '@mui/material';


interface PatientInformationCardProps {
    name: string,
    severity:number,
    
}

const  PatientInformationCard:React.FC<PatientInformationCardProps> =({name,severity})=> {
    const [checked,setChecked] = useState<boolean>(false);
    const handleCheckBoxClick = () => {
        setChecked(true);
    }
    return (
        <Card variant="outlined" style={{ cursor: 'pointer' }}>
        <CardContent>
            <Box>
                <Typography variant="h5" component="div">
                Name: {name}
                </Typography>
                <Typography variant="body1" component="div">
                Severity: {severity}
                </Typography>
            </Box>
            <Checkbox checked={checked} onChange={handleCheckBoxClick} />
        </CardContent>
        </Card>
        
    )
}

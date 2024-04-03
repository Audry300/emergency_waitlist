'use client'

import React,{useState} from 'react'
//import { Card, CardContent, Typography, Box, Checkbox} from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox } from '@mui/material';

interface PatientInformationCardProps {
    name: string,
    severity:number,
    estimatedWait:number,
    
}

const  PatientInformationCard:React.FC<PatientInformationCardProps> =({name,severity,estimatedWait})=> {
    const [checked,setChecked] = useState<boolean>(false);
    const handleCheckBoxClick = () => {
        setChecked(true);
    }
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>{name}</TableCell>
                        <TableCell>{`${estimatedWait} min`}</TableCell>
                        <TableCell>
                            <Checkbox checked={checked} onChange={handleCheckBoxClick} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        
    )
}

export default PatientInformationCard

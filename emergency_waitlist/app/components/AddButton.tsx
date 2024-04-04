import React from 'react'
import Link from 'next/link'

const AddButton:React.FC =()=> {
    const buttonStyle = {
        backgroundColor: '#f0f0f0', 
        border: 'none',
        borderRadius: '5px', 
        padding: '10px 20px', 
        cursor: 'pointer', 
        textDecoration: 'none', 
        color: '#000', 
      };
    
    return(
        <Link href="/admin/new"><button style={buttonStyle}>Add new patient</button></Link>
    )
}

export default AddButton
import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import DateTimePicker from 'react-datetime-picker';



export default function RegistroDia() {
    const paperStyle= {padding:"5% 1%", width:"100%", margin:"1% auto"}
    const [dataHorarioComeco, setDataHorarioComeco]=useState()
    const [dataHorarioFim, setDataHorarioFim]=useState(new Date())
    const [registros, setRegistros]=useState([])

    const handleClick=(e)=>{
        e.preventDefault()
        const registro={dataHorarioComeco, dataHorarioFim}
        console.log(registro)
        fetch("http://localhost:8080/registrodia/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(registro)
        }).then(()=>{
            console.log("Nova registro adicionado")
        })
    }

    useEffect(()=>{
        fetch("http://localhost:8080/registrodia/getAll")
        .then(res=>res.json())
        .then((result)=>{
            setRegistros(result);
        }
    )
    }, [])

    const [value, setValue] = React.useState('');

    return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 sytle={{color:"blue"}}><u>Novo Registro Diário</u></h1>
        <Box
        component="form"
        sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
             <DateTimePicker onChange={setDataHorarioComeco} value={dataHorarioComeco} />
    
             <DateTimePicker onChange={setDataHorarioFim} value={dataHorarioFim} />
        </Box>

        <Button variant="contained"
            endIcon={<SendIcon />}
            onClick={handleClick}>
            Enviar
        </Button>
        </Paper>

        <h1>Registros diários</h1>

        <Paper elevation={3} style={paperStyle}>
            {registros.map(registro=>(
                <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={registro.idRegistroDia}>
                    ID:{registro.idRegistroDia} <br/>
                    Nome:{registro.dataHorarioComeco} <br/>
                    Nome:{registro.dataHorarioFim} <br/>
                </Paper>
            ))}
        </Paper>
    </Container>
  );
}

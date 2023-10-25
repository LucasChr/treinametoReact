import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function Projeto() {
    const paperStyle= {padding:"5% 1%", width:"100%", margin:"1% auto"}
    const [user, setUser]=useState('')
    const [password, setPassword]=useState('')
    const [projetos, setProjetos]=useState([])

    const handleClick=(e)=>{
        e.preventDefault()
        const projeto={user, password}
        console.log(projeto)
        fetch("http://localhost:8080/projeto/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(projeto)
        }).then(()=>{
            console.log("Nova projeto adicionado")
        })
    }

    useEffect(()=>{
        fetch("http://localhost:8080/projeto/getAll")
        .then(res=>res.json())
        .then((result)=>{
            setProjetos(result);
        }
    )
    }, [])


    return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 sytle={{color:"blue"}}><u>Adicionando Projeto</u></h1>
        <Box
        component="form"
        sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
            <TextField id="outlined-basic" label="Nome projeto" variant="outlined" fullWidth
             value={user}
             onChange={(e)=>setUser(e.target.value)} />
            <TextField id="outlined-basic" label="Senha" variant="outlined" fullWidth
            value={password}
            onChange={(e)=>setPassword(e.target.value)} />
        </Box>

        <Button variant="contained"
            endIcon={<SendIcon />}
            onClick={handleClick}>
            Enviar
        </Button>
        </Paper>

        <h1>Projetos</h1>

        <Paper elevation={3} style={paperStyle}>
            {projetos.map(projeto=>(
                <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={projeto.idProjeto}>
                    ID:{projeto.idProjeto} <br/>
                    Nome:{projeto.user} <br/>
                </Paper>
            ))}
        </Paper>
    </Container>
  );
}

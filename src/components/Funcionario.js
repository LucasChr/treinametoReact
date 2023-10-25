import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function Funcionario() {
    const paperStyle= {padding:"5% 1%", width:"100%", margin:"1% auto"}
    const [nome, setNome]=useState('')
    const [sobrenome, setSobrenome]=useState('')
    const [dataNascimento, setDataNascimento]=useState('')
    const [funcao, setFuncao]=useState('')
    const [funcionarios, setFuncionarios]=useState([])
   


    const handleClick=(e)=>{
        e.preventDefault()
        const funcionario={nome, sobrenome, dataNascimento, funcao}
        console.log(funcionario)
        fetch("http://localhost:8080/funcionario/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(funcionario)
        }).then(()=>{
            console.log("Novo funcionario adicionado")
        })
    }

    useEffect(()=>{
        fetch("http://localhost:8080/funcionario/getAll")
        .then(res=>res.json())
        .then((result)=>{
            setFuncionarios(result);
        }
    )
    }, [])


    return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 sytle={{color:"blue"}}><u>Novo Funcionario</u></h1>
        <Box
        component="form"
        sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
            <TextField id="outlined-basic" label="Nome" variant="outlined" fullWidth
             value={nome}
             onChange={(e)=>setNome(e.target.value)} />
            <TextField id="outlined-basic" label="Sobrenome" variant="outlined" fullWidth
            value={sobrenome}
            onChange={(e)=>setSobrenome(e.target.value)} />
             <TextField id="outlined-basic" label="Data Nascimento" variant="outlined" fullWidth
            value={dataNascimento}
            onChange={(e)=>setDataNascimento(e.target.value)} />
            <TextField id="outlined-basic" label="Funcao" variant="outlined" fullWidth
            value={funcao}
            onChange={(e)=>setFuncao(e.target.value)} />
        </Box>

        <Button variant="contained"
            endIcon={<SendIcon />}
            onClick={handleClick}>
            Enviar
        </Button>
        </Paper>

        <h1>Funcionarios</h1>

        <Paper elevation={3} style={paperStyle}>
            {funcionarios.map(funcionario=>(
                <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={funcionario.idFuncionario}>
                    ID:{funcionario.idFuncionario} <br/>
                    Nome:{funcionario.nome} <br/>
                    Sobrenome:{funcionario.sobrenome} <br/>
                    Data Nascimento:{funcionario.dataNascimento} <br/>
                    Funcao:{funcionario.funcao} <br/>
                </Paper>
            ))}
        </Paper>
    </Container>
  );
}

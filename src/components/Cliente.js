import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Alert, AlertTitle, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function Cliente() {
    const paperStyle = { padding: "5% 1%", width: "100%", margin: "1% auto" }
    const [nomeFantasia, setNomeFantasia] = useState('')
    const [razaoSocial, setRazaoSocial] = useState('')
    const [cnpjCpf, setCnpjCpf] = useState('')
    const [descricaoProblema, setDescricaoProblema] = useState('')
    const [clientes, setClientes] = useState([])
    const [sucesso, setSucesso] = useState(false);

    const handleClick = (e) => {
        e.preventDefault()
        const cliente = { nomeFantasia, razaoSocial, cnpjCpf, descricaoProblema }
        console.log(cliente)
        fetch("http://localhost:8080/cliente/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente)
        }).then((response) => {
            console.log(response.status)
            if (response.status == 200) {
                setSucesso(true);
            }
        })
    }

    useEffect(() => {
        fetch("http://localhost:8080/cliente/getAll")
            .then(res => res.json())
            .then((result) => {
                setClientes(result);
            }
            )
    }, [])


    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <Collapse in={sucesso}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setSucesso(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                        severity="success"
                        variant='filled'
                    >
                        <AlertTitle>Sucesso!</AlertTitle>
                        Novo Cliente adicionado! <strong>verifique abaixo</strong>
                    </Alert>
                </Collapse>
                <h1 sytle={{ color: "blue" }}><u>Novo Cliente</u></h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="Nome Fantasia" variant="outlined" fullWidth
                        value={nomeFantasia}
                        onChange={(e) => setNomeFantasia(e.target.value)} />
                    <TextField id="outlined-basic" label="Razão Social" variant="outlined" fullWidth
                        value={razaoSocial}
                        onChange={(e) => setRazaoSocial(e.target.value)} />
                    <TextField id="outlined-basic" label="CNPJ/CPF" variant="outlined" fullWidth
                        value={cnpjCpf}
                        onChange={(e) => setCnpjCpf(e.target.value)} />
                    <TextField id="outlined-basic" label="Descricao do Problema" variant="outlined" fullWidth
                        value={descricaoProblema}
                        onChange={(e) => setDescricaoProblema(e.target.value)} />
                </Box>

                <Button variant="contained"
                    endIcon={<SendIcon />}
                    onClick={handleClick}>
                    Enviar
                </Button>
            </Paper>

            <h1>Clientes</h1>

            <Paper elevation={3} style={paperStyle}>
                {clientes.map(cliente => (
                    <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={cliente.idCliente}>
                        ID:{cliente.idCliente} <br />
                        Nome:{cliente.nomeFantasia} <br />
                        Razao Social:{cliente.razaoSocial} <br />
                        CPF/CNPJ:{cliente.cnpjCpf} <br />
                        Descricao Problema:{cliente.descricaoProblema} <br />
                    </Paper>
                ))}
            </Paper>
        </Container>
    );
}

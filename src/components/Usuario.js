import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import CloseIcon from '@mui/icons-material/Close';
import { AccountCircle } from '@mui/icons-material';
import { Alert, AlertTitle, Collapse } from '@mui/material';

export default function Usuario() {
    const paperStyle= {padding:"5% 1%", width:"100%", margin:"1% auto"}
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')
    const [usuarios, setUsuarios] = useState([])
    const [error, setError] = useState(false);
    const [sucesso, setSucesso] = useState(false);

    const handleClick = (e) => {
        e.preventDefault()
        if (password == password1) {
            const usuario = { user, password }
            console.log(usuario)
            fetch("http://localhost:8080/usuario/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usuario)
            }).then((response) => {
                console.log(response.status)
                if(response.status == 200){
                    setSucesso(true);
                }   
            })
        } else {
            console.log("Senhas não conferem!")
            setError(true);
        }
    }

    useEffect(() => {
        fetch("http://localhost:8080/usuario/getAll")
            .then(res => res.json())
            .then((result) => {
                setUsuarios(result);
            }
            )
    }, [])

    const [values, setValues] = React.useState({
        amount: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const verificaPassword = (value) => {
        console.log(value);
        if (value != password) {
            setError(true);
        } else {
            setError(false);
            setPassword1(value);
        }
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container>

            <Paper elevation={3} style={paperStyle}>
                <Collapse in={error}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setError(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                        severity="error"
                        variant='filled'
                    >
                       <AlertTitle>Erro</AlertTitle>
                        As Senhas não conferem! <strong>verifique novamente</strong>
                    </Alert>
                </Collapse>
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
                        Novo Usuário adicionado! <strong>verifique abaixo</strong>
                    </Alert>
                </Collapse>
                <h1 sytle={{ color: "blue" }}><u>Novo Usuário</u></h1>

                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                        id="outlined-basic-name"
                        label="Nome Usuario"
                        variant="outlined"
                        fullWidth
                        value={user}
                        onChange={(e) => setUser(e.target.value)} />
                    <TextField
                        error={error}
                        id="outlined-basic-passwd-cf"
                        type="password"
                        autoComplete="current-password"
                        label="Senha"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <TextField
                        error={error}
                        helperText="AS SENHAS DEVEM SER IGUAIS!"
                        id="standard-password-input"
                        label="Confirme a senha"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                        onBlur={(e) => verificaPassword(e.target.value)}
                    />


                </Box>

                <Button variant="contained"
                    endIcon={<SendIcon />}
                    onClick={handleClick}>
                    Enviar
                </Button>
            </Paper>

            <h1>Usuarios</h1>

            <Paper elevation={3} style={paperStyle}>
                {usuarios.map(usuario => (
                    <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={usuario.idUsuario}>
                        ID:{usuario.idUsuario} <br />
                        Nome:{usuario.user} <br />
                    </Paper>
                ))}
            </Paper>
        </Container>
    );
}

import React, {useEffect, useState} from 'react';
import Cliente from "../components/Cliente";
import Usuario from '../components/Usuario';
import P404 from "../pages/P404";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Funcionario from "../components/Funcionario";
import Tarefa from "../components/Tarefa";
import Projeto from "../components/Projeto";
import RegistroDia from "../components/Registrodia";

export default function Rotas(){
    return (
        <div>
        { /* Roteador para os links do menu */ }
        <Router>
          <Routes>
            {/* <Route exact path="/" component={Home} />*/}
            
            {/** Path do cliente para direcionamento da página de Clientes**/}
            <Route path="/cliente" element={<Cliente/>} />
  
            {/** Path do usuario para direcionamento da página de Usuarios**/}
            <Route path="/funcionario" element={<Funcionario/>} />

            {/** Path do usuario para direcionamento da página de Usuarios**/}
            <Route path="/projeto" element={<Projeto/>} />

            {/** Path do usuario para direcionamento da página de Usuarios**/}
            <Route path="/tarefa" element={<Tarefa/>} />

            {/** Path do usuario para direcionamento da página de Usuarios**/}
            <Route path="/registrodia" element={<RegistroDia/>} />

            {/** Path do usuario para direcionamento da página de Usuarios**/}
            <Route path="/usuario" element={<Usuario/>} />
            
            {/** Path da página de erro 404**/}
            <Route path="/404" element={<P404/>} />

            {/** Path default da aplicação agora está setado para a página de Usuários**/}
          </Routes>
        </Router>
        </div>
    );
}
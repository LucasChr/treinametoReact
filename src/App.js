import React, {useEffect, useState} from 'react';
import './App.css';
import ButtonAppBar from './components/Appbar';
import Rotas from './config/Rotas';

function App() {
  return (
    <div className="App">
      <Rotas/>
      <ButtonAppBar/> 
     
    </div>
  );
}

export default App;

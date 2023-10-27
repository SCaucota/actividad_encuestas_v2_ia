import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './componentes/menu/Menu';
import Inicio from './componentes/inicio/Inicio';
import Encuesta from './componentes/encuesta/Encuesta';
import CrearEncuesta from './componentes/crearEncuesta/CrearEncuesta';
import encuestas from './data/encuestas.json';
import './App.css';

function App() {

  const [listaEncuestas, setListaEncuestas] = useState(encuestas);

  const agregarEncuestas = (nuevaEncuesta) => {
    nuevaEncuesta.id = listaEncuestas.length + 1;
    setListaEncuestas([...listaEncuestas, nuevaEncuesta]);
  }

  return (
    <div className='container'>
      <BrowserRouter>
      <Menu/>
        <Routes>
          <Route path="/" element={<Inicio lista={listaEncuestas} />} />
          <Route path="/encuesta/:id" element={<Encuesta lista={listaEncuestas} />} />
          <Route path="/crearEncuesta" element={<CrearEncuesta agregarEncuestas={agregarEncuestas} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

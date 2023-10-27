import React from 'react';
import { Link } from 'react-router-dom';
import './inicio.css';

const Inicio = ({lista}) => {
  return (
    <div>
      <h1 className="encuestas-title">Encuestas Pendientes</h1>
      <ul className="encuestas-list">
        {
          lista.map((encuesta, index)=> (
            <Link to={`/encuesta/${encuesta.id}`}  key={index}>
              <div className='encuestas-item'>
                <h2>{encuesta.title}</h2>
                <p>{encuesta.description}</p>
              </div>
            </Link>
          ))
        }
      </ul>
    </div>
  );
};

export default Inicio;
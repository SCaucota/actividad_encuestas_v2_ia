import React from "react";
import { useParams, Link } from 'react-router-dom';
import './encuesta.css';

const Encuesta = ({ lista }) => {
    const { id } = useParams();

    const encuestaSeleccionada = lista.find(encuesta => encuesta.id === parseInt(id));

    return (
        <div>
            <h1 className="encuesta-title">{encuestaSeleccionada.title}</h1>
            <h2 className="encuesta-description">{encuestaSeleccionada.description}</h2>
            <div className="encuesta-list">
                
                {encuestaSeleccionada.questions.map((pregunta, index) => (
                    <ul key={index}>
                        <h3 className="encuesta-pregunta">{pregunta.title}</h3>
                        {pregunta.options.map((opcion, index) => (
                            <li key={index}>{opcion.title}</li>
                        ))}
                    </ul>
                ))}
            </div>
            <div className="encuesta-button">
                <Link to={`/`} className="encuesta-link">
                    <button className="button">Volver</button>
                </Link>
            </div>
        </div>
    );

};

export default Encuesta;


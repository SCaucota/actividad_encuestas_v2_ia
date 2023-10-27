import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './crearEncuesta.css';

const CrearEncuesta = ({ agregarEncuestas }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    const [preguntas, setPreguntas] = useState([]); // Estado local para preguntas
    const [nuevaPregunta, setNuevaPregunta] = useState(''); // Estado local para la nueva pregunta

    const [opciones, setOpciones] = useState([]); // Estado local para opciones
    const [nuevaOpcion, setNuevaOpcion] = useState(''); // Estado local para la nueva opción

    const [error, setError] = useState('');

    const minimoDeOpciones = () => {
        for (const opcion of opciones) {
            if (opcion.length < 2) {
                return false;
            }
        }
        return true;
    };

    const onSubmit = (data) => {

        setError('');

        if (preguntas.length === 0) {
            setError('Debes agregar al menos una pregunta a la encuesta');
            return;
        }

        const todasLasPreguntasCumplen = opciones.every(minimoDeOpciones);

        if (!todasLasPreguntasCumplen) {
            setError('Todas las preguntas deben tener al menos 2 opciones');
            return;
        }else{
            const encuesta = {
                title: data.title,
                description: data.description,
                questions: preguntas.map((pregunta, index) => ({
                    id: index + 1,
                    title: pregunta,
                    options: opciones[index] ? opciones[index].map((opcion, subIndex) => ({
                        id: subIndex + 1,
                        title: opcion,
                    })) : [] // Si no hay opciones, asigna un array vacío
                })),
            };
            agregarEncuestas(encuesta);
            reset(); // Limpiar el formulario
            navigate('/');
        }
    };

    const agregarPregunta = () => {
        setError('');

        if (nuevaPregunta.trim() !== '') {
            setPreguntas([...preguntas, nuevaPregunta]);
            setOpciones([...opciones, []]); // Inicializar opciones para esta pregunta
            setNuevaPregunta('');
        }
    };

    const eliminarPregunta = (index) => {
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas.splice(index, 1);
        setPreguntas(nuevasPreguntas);

        const nuevasOpciones = [...opciones];
        nuevasOpciones.splice(index, 1);
        setOpciones(nuevasOpciones);
    };

    const agregarOpcion = (preguntaIndex) => {
        setError('');

        if (nuevaOpcion.trim() !== '') {
            const nuevasOpciones = [...opciones];
            nuevasOpciones[preguntaIndex] = [...nuevasOpciones[preguntaIndex], nuevaOpcion];
            setOpciones(nuevasOpciones);
            setNuevaOpcion('');
        }
    };

    const eliminarOpcion = (preguntaIndex, opcionIndex) => {
        const nuevasOpciones = [...opciones];
        nuevasOpciones[preguntaIndex].splice(opcionIndex, 1);
        setOpciones(nuevasOpciones);
    };

    return (
        <div>
            <h1 className="encuestas-title">Crear Encuesta</h1>
            <form className="encuestas-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="encuestas-input">
                    <label htmlFor="title">Título de la encuesta</label>
                    <input 
                        type="text"
                        id="title" 
                        {...register('title', {
                            required: 'Este campo es requerido',
                            maxLength: {
                                value: 50,
                                message: 'El título no debe exceder los 50 caracteres'
                            }
                        })}
                    />
                    {errors.title && <span className="mensajeError" >{errors.title.message}o</span>}
                </div>
                <div className="encuestas-input">
                    <label htmlFor="description">Descripción de la encuesta</label>
                    <textarea
                        id="description"
                        {...register('description', {
                            required: 'Este campo es requerido',
                            maxLength: {
                                value: 100,
                                message: 'La descripción no debe exceder los 100 caracteres'
                            }
                        })}
                    />
                    {errors.description && <span className="mensajeError" >{errors.description.message}</span>}
                </div>
                <div className="encuestas-input">
                    <label htmlFor="pregunta">Pregunta</label>
                    <input type="text" id="pregunta" value={nuevaPregunta} onChange={(e) => setNuevaPregunta(e.target.value)} />
                </div>
                <button className='button' type="button" onClick={agregarPregunta}>Agregar Pregunta</button>
                {error && (
                    <div className="mensajeError">
                        <h4>{error}</h4>
                    </div>
                )}
                {preguntas.map((pregunta, index) => (
                    <div key={index} className="encuestas-pregunta">
                        <h3>{pregunta}</h3>
                        <div className="encuestas-input" >
                            <label htmlFor="opcion">Opción</label>
                            <input type="text" value={nuevaOpcion} onChange={(e) => setNuevaOpcion(e.target.value)} />
                            <button className='button' type="button" onClick={() => agregarOpcion(index)}>Agregar Opción</button>
                        </div>
                        <ul>
                            {opciones[index].map((opcion, opcionIndex) => (
                                <li className='encuestas-opciones' key={opcionIndex}>
                                    {opcion}
                                    <button className='buttonDelete' type="button" onClick={() => eliminarOpcion(index, opcionIndex)}>Eliminar</button>
                                </li>
                            ))}
                        </ul>
                        <button className='buttonDelete' type="button" onClick={() => eliminarPregunta(index)}>Eliminar Pregunta</button>
                    </div>
                ))
                }
                <div className="onsubmit">
                    <button type="submit">Crear Encuesta</button>
                </div>
            </form >
        </div >
    );
};

export default CrearEncuesta;

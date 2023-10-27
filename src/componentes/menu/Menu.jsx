import React from "react";
import {Link} from 'react-router-dom';
import './menu.css';

const Menu = () => {
    return (
        <div className="menu-container"> 
            <h1 className="menu-title">Encuestas</h1> 
            <ul className="menu-list">
                <li className="menu-list-item"> 
                    <Link to="/" className="menu-link">Lista de Encuestas</Link>
                </li>
                <li className="menu-list-item">
                    <Link to="/crearEncuesta" className="menu-link">Crear Encuesta</Link>
                </li>
            </ul>
        </div>
    );
};

export default Menu;
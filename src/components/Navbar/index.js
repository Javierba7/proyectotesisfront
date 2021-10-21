import React from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import '../../css/navbar.css';

const NavbarFunction = ({ verifyToken }) => {

    const cleanLocal = (e) => {
        localStorage.clear();
    };

    const reloadPage = () => {
        window.location.reload();
    };

    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">Miscelaneos Sandra</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            {verifyToken ? 
            <div className="collapse navbar-collapse" id="navbarNav">
                    <div>
                        <input type="text" name="searchBtn" id="searchInput"/>
                        <label id="searchBtn">Buscar</label>
                    </div> 
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                    <Link className="nav-link" to="/profile">Perfil</Link>
                    </li>
                    <li className="nav-item">
                        <Link  className="nav-link" to="/">Carrito</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" onClick={(e) => {cleanLocal(); reloadPage();}} to="/">Cerrar Sesión</Link>
                    </li>
                </ul>
            </div>
            : 
            <div className="collapse navbar-collapse" id="navbarNav">
                    <div>
                        <input type="text" name="searchBtn" id="searchInput"/>
                        <label id="searchBtn">Buscar</label>
                    </div>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link loginBtn" to="/login">Iniciar Sesión</Link>
                    </li>
                </ul>
            </div> 
            }
        </nav>
    </div>
    )
}

export default NavbarFunction
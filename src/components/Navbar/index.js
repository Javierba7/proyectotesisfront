import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import '../../css/navbar.css';

const NavbarFunction = ({ verifyToken }) => {

    const reloadPage = () => {
        window.location.reload();
    };

    const cleanLocal = (e) => {
        localStorage.clear();
        return <Redirect to="/" />
    };

    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/"><img className="homeImage" src="https://products-proyect.s3.us-west-1.amazonaws.com/home.png"/></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            {verifyToken ? 
            <div className="collapse navbar-collapse" id="navbarNav">
                    <div>
                        <img className="imgLogo" src="https://products-proyect.s3.us-west-1.amazonaws.com/qqqqqqqqqqq.png" alt=""/>
                    </div> 
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                    <Link className="nav-link" to="/profile">Perfil</Link>
                    </li>
                    <li className="nav-item">
                        <Link  className="nav-link" to="/shoppingCart">Carrito</Link>
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
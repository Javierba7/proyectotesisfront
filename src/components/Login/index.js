import React from 'react';
import { Link } from 'react-router-dom';

import '../../css/login.css';

const Login = () => {
    return (
        <div>
               <div className="containerLogin">
                   <div className="imgContainer">
                        <div id="titleForm">Bienvenido</div>
                        <div id="titleForm">Ingresa tu correo y contraseña</div>
                   </div>
                   <div className="formContainer">
                            <div className="form">
                                <input type="text" name="email" className="inputBig" required />
                                <label forhtml="name" className="label-name">
                                    <span className="content-name">Correo</span>
                                </label>
                            </div>
                            <div className="form">
                                <input type="password" name="password" className="inputBig" required />
                                <label forhtml="password" className="label-name">
                                    <span className="content-name">Contraseña</span>
                                </label>
                                
                            </div>
                            <form className="formSubmit">
                                <input type="submit" name="submit" value="Login"/>
                                <span className="textSpan"><Link to="/register">¿No tienes cuenta?</Link></span>
                            </form>
                   </div>
               </div>
           </div>
    )
}

export default Login;
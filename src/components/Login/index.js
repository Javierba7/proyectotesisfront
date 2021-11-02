import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../css/login.css';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            token: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = this.state;

        try {
            const response = await fetch('https://proyectotesisfront.herokuapp.com/api/users/login', {
                method: 'post',
                body: JSON.stringify({ email, password }),
                headers: {
                    "content-type": "application/json"
                }
            });
            const data = await response.json();
            
            if ( data.error ){ 
               console.log(data.error);
               this.notify(data.error);
            } else { 
                localStorage.setItem('auth-token', data.token);
                this.setState({ token: data.token})
            }
        } catch (err) {
            console.log(err);
        }
         
    }

    notify = (text) => toast(text);
    render() {
        if ( localStorage.getItem('auth-token') !== null || this.state.token !== '') {
            return <Redirect to="/" />
        } 
        return (
                <div className="containerLogin">
                    <div className="imgContainer">
                        <div id="titleForm">Bienvenido</div>
                        <div id="titleForm">Ingresa tu correo y contraseña</div>
                    </div>
                    <div className="formContainer">
                            <div className="form">
                                <input type="text" name="email" className="inputBig" onChange={this.handleChange} required />
                                <label forhtml="name" className="label-name">
                                    <span className="content-name">Correo</span>
                                </label>
                            </div>
                            <div className="form">
                                <input type="password" name="password" className="inputBig"  onChange={this.handleChange} required />
                                <label forhtml="password" className="label-name">
                                    <span className="content-name">Contraseña</span>
                                </label>
                            </div>
                            <form className="formSubmit">
                                <input type="submit" onClick={this.onSubmit} name="submit" value="Login" />
                                <span className="textSpan"><Link to="/register">¿No tienes cuenta?</Link></span>
                            </form>
                        </div>
                        <ToastContainer
                            position="top-right"
                            autoClose={2000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                </div>
        )
    }
};

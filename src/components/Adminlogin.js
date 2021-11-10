import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';

import '../css/login.css';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            token: '',
            session: false,
            validUser: false,
            user: {}
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

        if (email === 'sandrajuarezalvarez74@gmail.com') {
            try {
                const response = await fetch('https://proyectobacktesis.herokuapp.com/api/users/login', {
                    method: 'post',
                    body: JSON.stringify({ email, password }),
                    headers: {
                        "content-type": "application/json"
                    }
                });
                const data = await response.json();
                
                if ( data.error ){ 
                   this.notify(data.error);
                } else { 
                    localStorage.setItem('auth-token', data.token);
                    this.setState({
                        session: true
                    })
                    this.setState({ token: data.token})
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            this.notify('Usuario incorrecto');
        }

         
    }

    async fetchUser() {
        const token =  localStorage.getItem('auth-token');
        if (!token ) return '';
        
        const tokenDecoded = await jwt_decode(token);
        const { _id: userId } = tokenDecoded;
        const response = await fetch(`https://proyectobacktesis.herokuapp.com/api/users/${userId}`);
        const user = await response.json();

        if (user.email !== 'sandrajuarezalvarez74@gmail.com') {
            localStorage.clear();
            return this.setState({
                session: false
            })
        }

        return this.setState({
            session: true
        });
    } 

    async componentDidMount() {
        await this.fetchUser();
    }

    notify = (text) => toast(text);


    render() {
        const session = this.state.session;
    
        if (session) {
            return <Redirect to="/admin/update" />
        }

        return (
                <div className="containerLogin">
                    <div className="imgContainer">
                        <div id="titleForm">Bienvenido Administrador</div>
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
                                <div>
                                    <Link to="/login">Regresar</Link>
                                </div>
                            </form>
                        </div>
                        <ToastContainer
                            position="bottom-right"
                            autoClose={1500}
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

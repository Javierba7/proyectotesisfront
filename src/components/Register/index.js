import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../css/login.css';


export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            secondName: '',
            lastName: '',
            secondLastName: '',
            test: ''
        }
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    notify = (text) => toast(text);

    handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, name } = this.state;
        const { lastName, secondName, secondLastName} = this.state;

        try {
            const response = await fetch('https://proyectobacktesis.herokuapp.com/api/users/register', {
                method: 'post',
                body: JSON.stringify({ 
                    email,
                    password,
                    name,
                    secondName,
                    lastName,
                    secondLastName,
                }),
                headers: {
                    "content-type": "application/json"
                }
            });
            const data = await response.json();
            
            if ( data.error ){
                console.log(data.error);
                this.notify(data.error);
            } else {
                this.notify('Te has registrado con exito');
                this.timesOut(data.user);   
            }
        }catch (error) {
            console.log(error);
        }   
    }

    timesOut(res) {
        setTimeout(() => { 
            this.setState({
                test: res
            });
        }, 2000);
      }
    
    render() {
        if ( this.state.test !== '') {
            return <Redirect to='/login' />
        }
        return (
            <div>
            <div className="containerLogin">
            <div className="imgContainer">
                        <div id="titleForm">Bienvenido</div>
                        <div id="titleForm">Registrate</div>
                   </div>
                <div className="formContainer">
                         <div className="form">
                             <input type="text" className="inputBig" name="email" onChange={this.handleChange} required />
                             <label forhtml="name" className="label-name">
                                 <span className="content-name">Correo electronico</span>
                             </label>
                         </div>
                         <div className="form">
                             <input type="password" className="inputBig" name="password"  onChange={this.handleChange}required />
                             <label forhtml="password" className="label-name">
                                 <span className="content-name">Contraseña</span>
                             </label>
                         </div>
                         <div className="form">
                             <input type="text"  className="inputBig" name="name"  onChange={this.handleChange}required />
                             <label forhtml="name" className="label-name">
                                 <span className="content-name">Nombre</span>
                             </label>
                         </div>
                         <div className="form">
                             <input type="text"  className="inputBig" name="secondName"  onChange={this.handleChange}required />
                             <label forhtml="name" className="label-name">
                                 <span className="content-name">Segundo nombre</span>
                             </label>
                         </div>
                         <div className="form">
                             <input type="text" className="inputBig" name="lastName"  onChange={this.handleChange}required />
                             <label forhtml="lastname" className="label-name">
                                 <span className="content-name">Apellido</span>
                             </label>
                         </div>
                         <div className="form">
                             <input type="text"  className="inputBig" name="secondLastName"  onChange={this.handleChange}required />
                             <label forhtml="name" className="label-name">
                                 <span className="content-name">Segundo apellido</span>
                             </label>
                         </div>
                         <div className="formSubmit">
                             <input type="submit" onClick={this.handleSubmit} name="submit" value="Register"/>
                             <span className="textSpan"><Link to="/login">¿Aun no te registras? vamos da clic aquí </Link></span>
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
            </div>
        </div>
        )
    }
}
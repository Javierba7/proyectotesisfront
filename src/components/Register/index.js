import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';

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

    handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, name } = this.state;
        const { lastName, secondName, secondLastName} = this.state;

        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
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
                
            } else {
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
        }, 3000);
      }
    
    render() {
        if ( this.state.test !== '') {
            return <Redirect to='/login' />
        }
        console.log(this.state);
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
                             <span className="textSpan"><Link to="/login">¿Ya tienes cuenta?</Link></span>
                         </div>
                </div>
            </div>
        </div>
        )
    }
}
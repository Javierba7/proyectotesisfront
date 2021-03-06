import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import Navbar from '../Navbar';

import '../../css/profile.css';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            verifyToken: false
        }
    }

    async fetchUser() {
        const token =  localStorage.getItem('auth-token');
        const tokenDecoded = await jwt_decode(token);
        const { _id: userId } = tokenDecoded;
        const response = await fetch(`https://proyectobacktesis.herokuapp.com/api/users/${userId}`);
        const user = await response.json();

        this.setState({
            user,
        });
    } 

    checkLocalStorage() {
        const token = localStorage.getItem('auth-token');
        if (token) {
            this.fetchUser();
            return this.setState({
                verifyToken: true
            });
        }
        return this.setState({
            verifyToken: false
        });
    };

    componentDidMount() {
        this.checkLocalStorage();
    }

    render() {
        const { email, name, lastName, secondLastName } = this.state.user;
        const { purchases = [], secondName } = this.state.user;
        const { verifyToken } = this.state;
        
        if (!localStorage.getItem('auth-token')) {
            return <Redirect to="/" />
        } 
        return (
            <div>
                <Navbar verifyToken={verifyToken}/>   
                <div className="profileContainer">
                    <div className="profileSpacing">
                        <div className="profilePart">
                            <div className="leftPart">
                                <div className="leftText"><label>Nombre: </label></div>
                                <div className="rightText"><span>{name}</span></div>
                            </div>
                            <div className="leftPart">
                                <div className="leftText"><label>Segundo nombre: </label></div>
                                <div className="rightText"><span>{secondName ? secondName : ''}</span></div>
                            </div>
                        </div>
                        <div className="profilePart">
                            <div className="leftPart">
                                <div className="leftText"><label>Apellido: </label></div>
                                <div className="rightText"><span>{lastName}</span></div>
                            </div>
                            <div className="leftPart">
                                <div className="leftText"><label>Segundo apellido: </label></div>
                                <div className="rightText"><span>{secondLastName}</span></div>
                            </div>
                        </div>
                        <div className="profilePart">
                            <div className="leftPart">
                                <div className="leftText"><label>Correo electronico: </label></div>
                                <div className="rightText"><span>{email}</span></div>
                            </div>
                            <div className="leftPart pastLast">
                                
                            </div>
                        </div>
                    </div>
                    <div className="shopCounting">
                        {
                            purchases.length > 0 ? 
                            <div className="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Fecha de compra</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchases.map((el) => {
                                        return el.map((item) => {
                                            const { date } = item;
                                            const newDate = new Date(date);
                                            return (
                                                <tr>
                                                    <th scope="row">{item.name}</th>
                                                    <td>{`$ ${item.price}`}</td>
                                                    <td>{`${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`}</td>
                                                </tr>
                                            )
                                        });
                                    })}
                                </tbody>
                            </table>
                        </div>
                            :
                            <div className="noShopping">No hay compras</div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

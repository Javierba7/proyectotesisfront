import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

import Navbar from '../Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import jwt_decode from 'jwt-decode';

import '../../css/shoppingCart.css';

export default class ShoppingCart extends Component {
    constructor(props){
        super(props);
        this.state = {
            verifyToken: false,
            shoppingCart: [],
            total: 0,
            token: ''
        }
    }

    checkLocalStorage() {
        const token = localStorage.getItem('auth-token');
        const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));

        let totalFinal = 0; 

        if (shoppingCart) {

            shoppingCart.map((el) => {
                if(!el.price) {
                    return 0;
                }
                totalFinal = totalFinal + Number(el.price);
            });

            this.setState({
                shoppingCart,
                total: totalFinal
            });
        }else {
            this.setState({
                shoppingCart: [],
                total: totalFinal
            });
        }


        if (token !== null) {
            return this.setState({
                verifyToken: true
            });
        }
        return this.setState({
            verifyToken: false
        });
    };

    deleteFromShoppingCart(id) {
        const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
        
        const newShoppingCart = shoppingCart.filter(el => el._id !== id);

        const deleteConfirm = window.confirm('¿Estas seguro de quitarlo?');

        if(deleteConfirm) {
            localStorage.setItem('shoppingCart', JSON.stringify(newShoppingCart));

            window.location.reload(true);
            this.setState({
                shoppingCart: newShoppingCart
            });
        }
    }

    componentDidMount() {
        this.checkLocalStorage();
    }

    cleanLocal() {
        localStorage.setItem('shoppingCart', JSON.stringify([]));
        window.location.reload(true);
    }

    notify = (text) => toast(text);

    async buyItems () {
        const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
        
        const token = localStorage.getItem('auth-token');
        const tokenDecoded = await jwt_decode(token);
        const { _id: userId } = tokenDecoded;

        try {
        await fetch(`https://proyectobacktesis.herokuapp.com/api/users/${userId}/update`, {
                method: 'POST',
                body: JSON.stringify({result: shoppingCart}),
                headers: {
                    "content-type": "application/json"
                }
        });

        await fetch(`https://proyectobacktesis.herokuapp.com/api/users/6173ac998f00a2567d34e6ff/update`, {
            method: 'POST',
            body: JSON.stringify({result: shoppingCart}),
            headers: {
                "content-type": "application/json"
            }
        });

        localStorage.setItem('shoppingCart', JSON.stringify([]));
        this.notify('Se han enviado los items al admin');
        window.location.reload(true);
        } catch(error) {
            console.log(error);
        }        
    }
    

    render() {
        const verifyToken = this.state.verifyToken;
        const shoppingCart = this.state.shoppingCart;

        if (!localStorage.getItem('auth-token')) {
            return <Redirect to="/" />
        } 

        return (
            <div className="cartShoppingContainer">
                <Navbar verifyToken={verifyToken}/> 
                <div className="cartSection">
                    <div className="titleSectionCart">
                        Tú carrito de compras
                    </div>
                    <div className="tableSectionCart table-responsive">
                        <div className="tableCartSpace">
                            {
                                shoppingCart.length > 0 ? 
                                <table className="table">
                                    <thead>
                                        <tr className="table-info">
                                            <th className="tableHeaders" scope="col">Imagen</th>
                                            <th className="tableHeaders" scope="col">Nombre</th>
                                            <th className="tableHeaders" scope="col">Precio</th>
                                            <th className="tableHeaders" scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            shoppingCart.map((el => {
                                                return (
                                                    <tr>
                                                        <td><img className="imgSizeCart" src={el.imgUrl} alt={el.name}/></td>
                                                        <td>{el.name}</td>
                                                        <td>{`$ ${el.price}`}</td>
                                                        <td>
                                                            <button onClick={() => this.deleteFromShoppingCart(el._id)} className="btnDeleteLocal">Borrar</button>
                                                        </td>
                                                    </tr>
                                                )
                                            }))
                                        }
                                    </tbody>
                                </table> :
                                <div className="shoppingMessage">Tu compra se ha realizado correctamente! Ve al menu principal y agrega algo!</div>
                            }
                        </div>
                        <div className="btnSectionCart">
                                <div className="priceSection">
                                    <div>
                                        Total a pagar
                                    </div>
                                    <div>
                                        <span>{`$ ${this.state.total}`}</span>
                                    </div>
                                </div>
                                <div className={this.state.total > 0 ? 'btnsSectionBuy' : 'displayNoneBtn'}>
                                    <div>
                                        <button className="btnBuy" onClick={() => this.buyItems()} id="boughtBtn">Comprar</button>
                                    </div>
                                    <div>
                                        <button className="btnBuy" onClick={() => this.cleanLocal()} id="cleanLocal">Limpiar Carrito</button>
                                    </div>
                                </div>
                        </div>
                    </div>
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
}

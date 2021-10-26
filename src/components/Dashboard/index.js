import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../css/dashboard.css';
import jwt_decode from 'jwt-decode';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../Navbar';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            products: [],
            verifyToken: false,
            newProducts: []
        }

    }

    notify = (text) => toast(text);

    checkLocalStorage() {
        const token = localStorage.getItem('auth-token');
        if (token !== null) {
            return this.setState({
                verifyToken: true
            });
        }
        return this.setState({
            verifyToken: false
        });
    };



    async getProducts(){
        const response = await fetch('http://localhost:5000/api/product');
        const products = await response.json();

        this.setState({
            products,
        });

        this.displayProductsInOffer();
    }

    displayProductsInOffer(){
        const temp = [];

        for (let i = 0; i < 4; i++) {
            const random = Math.floor(Math.random() * this.state.products.length);
            if (this.state.products[random]) {
                temp.push((<div className="offerCard" key={`${this.state.products[random]._id}`}> 
                    <div className="cardImg">
                        <img className="imgSize"  src={this.state.products[random].imgUrl} alt={`${this.state.products[random].name}-non`}/>
                    </div>
                    <div className="cardDescription">
                        {`Nombre: ${this.state.products[random].name}`}
                        <div className="productsLeft">{`Restan: ${this.state.products[random].quantity}`}</div>
                    </div>
                    <div className="cardPrice">
                        {`$ ${this.state.products[random].price}`}
                        <div>
                            <button onClick={() => this.addingToShoppingCart(this.state.products[random])} className="btnShopping">Agregar al carrito</button>
                        </div>
                    </div>
                </div>));
            }
        }

        this.setState({
            newProducts: temp
        })
    };

    componentDidMount() {
        this.checkLocalStorage();
        this.getProducts();
    }

    async fetchUser() {
        const token =  localStorage.getItem('auth-token');
        const tokenDecoded = await jwt_decode(token);
        const { _id: userId } = tokenDecoded;
        const response = await fetch(`http://localhost:5000/api/users/${userId}`);
        const user = await response.json();

        return user;
    } 
    
    async addingToShoppingCart(item) {
        if (localStorage.getItem('auth-token')) {
            const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));

            const { _id, name, price, imgUrl } = item;

            const user = await this.fetchUser();

            const { name: userName, lastName } = user;

            const newObj = {
                _id,
                name,
                price,
                imgUrl,
                date: new Date(),
                fullname: `${userName} ${lastName}`
            };

            if (shoppingCart) {
                const newShoppingCart = shoppingCart.concat([newObj]);
                localStorage.setItem('shoppingCart', JSON.stringify(newShoppingCart)); 
            } else {
                const newShoppingCart = [newObj];
                localStorage.setItem('shoppingCart', JSON.stringify(newShoppingCart));
            }
            this.notify('Se ha añadido al carrito');
        }else {
            this.notify('Primero inicia sesión')
        }
        
    }

    render() {
        const { verifyToken, newProducts } = this.state;

        return (
            <div className="mainContainer-dashboard">
                <Navbar verifyToken={verifyToken} />
                <div className="offerProductSection">
                    <div className="offerNameSection">
                        Productos en oferta!
                    </div>
                    <div className="offerProductSubSection">
                        {newProducts.map(el => {
                            return el;
                        })}
                    </div>
                </div>
                <div className="spaceCategory">
                    <div className="categorySection">
                            <div className="offerNameSection">
                                Categorias
                            </div>
                            <button className="categoryBubble">
                                <Link to="/section/school" className="categoryBubble">
                                    Escolar
                                </Link>
                            </button>
                            <button className="categoryBubble">
                                <Link to="/section/toys"  className="categoryBubble">
                                    Jugueteria
                                </Link>
                            </button>
                            <button className="categoryBubble">
                                <Link to="/section/office"  className="categoryBubble">
                                    Oficina
                                </Link>
                            </button>
                            <button className="categoryBubble">
                                <Link to="/section/shop"  className="categoryBubble">
                                    Abarrotes
                                </Link>
                            </button>
                            <button className="categoryBubble">
                                <Link to="/section/gifts" className="categoryBubble">
                                    Regalos
                                </Link>
                            </button>
                    </div>
                </div>
               <footer className="footerDisplay">
                    <div className="footerAddress">
                        <div>Dirección</div><span>Colonia Hermenegildo Galeana, Calle zacatula #417</span>
                    </div>
                    <div className="footerNumbers">
                    <div>Teléfono</div><span>6565271691</span>
                    </div>
                    <div className="footerSocialMedia">
                    <div>Redes sociales</div><span>Facebook</span>
                    </div>
                </footer>
                <ToastContainer
                    position="top-right"
                    autoClose={1000}
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

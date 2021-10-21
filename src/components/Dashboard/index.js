import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../css/dashboard.css';

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
        })
        this.displayProductsInOffer();
    }

    displayProductsInOffer(){
        const temp = [];
        for (let i = 0; i < 4; i++) {
            if (this.state.products[i]) {
                temp.push((<div className="offerCard">
                    <div className="cardImg">
                        <img className="imgSize"  src={this.state.products[i].imgUrl} alt={`${this.state.products[i].name}-non`}/>
                    </div>
                    <div className="cardDescription">
                        {`Nombre: ${this.state.products[i].name}`}
                        <div className="productsLeft">{`Restan: ${this.state.products[i].quantity}`}</div>
                    </div>
                    <div className="cardPrice">
                        {`$ ${this.state.products[i].price}`}
                        <div>
                            <button className="btnShopping">Agregar al carrito</button>
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

    render() {
        const { verifyToken, newProducts } = this.state;

        return (
            <>
            <Navbar verifyToken={verifyToken} />
            <div className="mainContainer">
               <div className="offerProductSection">
                    <div className="offerNameSection">
                        Productos en oferta!
                    </div>
                    <div className="offerProductSubSection">
                        {newProducts.map(el => {
                            return el;
                        })}
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
            </div>
            </>
        )
    }
};

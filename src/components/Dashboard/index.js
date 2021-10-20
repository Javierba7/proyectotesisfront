import React, { Component } from 'react';

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
            this.setState({
                verifyToken: true
            });
        }
        this.setState({
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
                        {this.state.products[i].name}
                    </div>
                    <div className="cardPrice">
                        {this.state.products[i].price}
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
            <div>
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
                    <div className="categorySection">
                    <div className="offerNameSection">
                        Categorias
                    </div>
                        <button className="categoryBubble">
                            Escolar
                        </button>
                        <button className="categoryBubble">
                            Jugueteria
                        </button>
                        <button className="categoryBubble">
                            Oficina
                        </button>
                        <button className="categoryBubble">
                            Abarrotes
                        </button>
                        <button className="categoryBubble">
                            Regalos
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
        )
    }
};

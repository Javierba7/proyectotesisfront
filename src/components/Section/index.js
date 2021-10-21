import React, { Component } from 'react'

import Navbar from '../Navbar';

import '../../css/section.css';

export default class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verifyToken: false,
            sectionName: '',
            products: []
        }
    }

    componentDidMount() {
        this.checkLocalStorage();
        this.fetchProducts();
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

    async fetchProducts() {
        console.log(this.props.match.params.sectionName);
        const response = await fetch(`http://localhost:5000/api/product?department=${this.props.match.params.sectionName}`);
        const products = await response.json();
        this.setState({
            products,
        });
    }

    render () {
        const verifyToken = this.state.verifyToken;
        const products = this.state.products;
        return (
            <div>
                <Navbar verifyToken={verifyToken} />
                <div className="mainContainer-products">
                        <div className="boxContainer-products">
                            {
                                products.map((el) => {
                                    return (
                                        <div className="products-box">
                                            <div className="products-img">
                                                <img className="imgSize-box" src={el.imgUrl} alt={`${el.name + Math.random()}`} />
                                            </div>
                                            <div className="products-description">
                                                <div>
                                                    {el.name}
                                                </div>
                                                <div>
                                                    {`$ ${el.price}`}
                                                </div>
                                                <div className="spaceBtn">
                                                    <button className="btnShopping">agregar al carrito</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                </div>
            </div>
        )
    }
}

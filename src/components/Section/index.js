import React, { Component } from 'react'

import Navbar from '../Navbar';
import jwt_decode from 'jwt-decode';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    async fetchProducts() {
        console.log(this.props.match.params.sectionName);
        const response = await fetch(`https://proyectotesisfront.herokuapp.com/api/product?department=${this.props.match.params.sectionName}`);
        const products = await response.json();
        this.setState({
            products,
        });
    }

    async fetchUser() {
        const token =  localStorage.getItem('auth-token');
        const tokenDecoded = await jwt_decode(token);
        const { _id: userId } = tokenDecoded;
        const response = await fetch(`https://proyectotesisfront.herokuapp.com/api/users/${userId}`);
        const user = await response.json();

        return user;
    } 

    async addingToShoppingCart(item) {
        if (localStorage.getItem('auth-token')) {
            const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));

            const { _id, name, price, imgUrl } = item;

            const user = await this.fetchUser();
            console.log(user);
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
                console.log(newShoppingCart)
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
                                                    <button  onClick={() => this.addingToShoppingCart(el)} className="btnShopping">agregar al carrito</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
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

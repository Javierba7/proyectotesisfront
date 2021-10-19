import React, { useEffect, useState } from 'react';

import '../../css/dashboard.css';

import Navbar from '../Navbar';

const Dashboard = () => {

    const [verifyToken, setVerifyToken] = useState(false);
    const [products, setProducts] = useState([]);
    const [test, setTest] = useState([]);

    const checkLocalStorage = () => {
        const token = localStorage.getItem('auth-token');
        if (token !== null) {
            return setVerifyToken(true);
        }
        return setVerifyToken(false);
    };
    
    const getProducts = async () => {
        const response = await fetch('http://localhost:5000/api/product');
        const products = await response.json();
        setProducts(products);
        displayProductsInOffer();
    }

    const displayProductsInOffer = () => {
        const temp = [];
        for (let i = 0; i < 4; i++) {
            if (products[i]) {
                temp.push((<div className="offerCard">
                    <div className="cardImg">
                        <img className="imgSize"  src={products[i].imgUrl} alt={`${products[i].name}-non`}/>
                    </div>
                    <div className="cardDescription">
                        {products[i].name}
                    </div>
                    <div className="cardPrice">
                        {products[i].price}
                    </div>
                </div>));
            }
        }
        setTest(temp);
    };

    useEffect(() => {
        checkLocalStorage();
    }, [verifyToken]);

    useEffect(() => {
        getProducts();
    });

    return (
        <div>
            <Navbar verifyToken={verifyToken} />
            <div className="mainContainer">
               <div className="offerProductSection">
                    <div className="offerNameSection">
                        Productos en oferta!
                    </div>
                    <div className="offerProductSubSection">
                        {test.map(el => {
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
};

export default Dashboard;

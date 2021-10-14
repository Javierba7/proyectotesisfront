import React, { useEffect, useState }from 'react';

import '../../css/dashboard.css';

import Navbar from '../Navbar';

const Dashboard = () => {

    const [verifyToken, setVerifyToken] = useState(false);

    const checkLocalStorage = () => {
        const token = localStorage.getItem('auth-token');
        if (token !== null) {
            return setVerifyToken(true);
        }
        return setVerifyToken(false);
    };

    useEffect(() => {
        checkLocalStorage();
    }, [verifyToken]);

    return (
        <div>
            <Navbar verifyToken={verifyToken} />
            <div className="mainContainer">
               <div className="offerProductSection">
                    <div className="offerNameSection">
                        Productos en oferta!
                    </div>
                    <div className="offerProductSubSection">
                        <div className="offerCard">
                            <div className="cardImg">
                                img
                            </div>
                            <div className="cardDescription">
                                description
                            </div>
                            <div className="cardPrice">
                                price
                            </div>
                        </div>
                        <div className="offerCard">
                            <div className="cardImg">
                                img
                            </div>
                            <div className="cardDescription">
                                description
                            </div>
                            <div className="cardPrice">
                                price
                            </div>
                        </div>
                        <div className="offerCard">
                            <div className="cardImg">
                                img
                            </div>
                            <div className="cardDescription">
                                description
                            </div>
                            <div className="cardPrice">
                                price
                            </div>
                        </div>
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

export default Dashboard;
import React, { Component } from 'react'

import '../css/adminItemDashboard.css';

export default class AdminItemRequest extends Component {
constructor(props) {
    super(props);

    this.state = {
        purchases: [],
        _id: '',
        finalSum: 0
    }
}   

    async getUser() {
        const response = await fetch(`https://proyectotesisfront.herokuapp.com/api/users/6173ac998f00a2567d34e6ff`);
        const user = await response.json();

        const { purchases, _id } = user;

        this.setState({
            purchases,
            _id
        });
    }

    async deleteItemFromList(item) {
        const purchases = this.state.purchases;
        const filteredItem = purchases.filter(el => el !== item);

        await fetch(`https://proyectotesisfront.herokuapp.com/api/users/update/6173ac998f00a2567d34e6ff`, {
                method: 'PUT',
                body: JSON.stringify({purchases: filteredItem}),
                headers: {
                    "content-type": "application/json"
                }
        });

        await this.getUser();
    }

    componentDidMount(){
        this.getUser();
    }

    refreshComponent() {
        window.location.reload();
    }

    render() {
        const { purchases } = this.state; 
        return (
            <div className="adminDashboardContainer">
                <div className="dashboardSize">
                    <div className="refreshBtn">
                        <button id="btnRefresh" onClick={() => this.refreshComponent()}>Recargar</button>
                    </div>
                    {
                        purchases.map((item, index) => {
                            return (
                                <div>
                                    <table class="table">
                                        <div>{`Pedido #${index + 1}`}</div>
                                    <thead>
                                        <tr className="tableColor">
                                            <th>name</th>
                                            <th>price</th>
                                            <th>date</th>
                                            <th>fullname</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            item.map((el) => {
                                                const {date} = el;
                                                const newDate = new Date(date);
                                                this.state.finalSum += el.price;
                                                return (<tr>
                                                    <td>{el.name}</td>
                                                    <td>{`$ ${el.price}`}</td>
                                                    <td>{`${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`}</td>
                                                    <td>{el.fullname}</td>
                                                </tr>)
                                            })
                                        }
                                    </tbody>
                                    </table>
                                    <div>
                                        Total a pagar: <span>{`$ ${this.state.finalSum}`}</span>
                                    </div>
                                    <div className="tableMargin">
                                        <button id="btnItem" onClick={() => this.deleteItemFromList(item)}>Entregado</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

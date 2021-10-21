import React, { Component } from 'react'

import Navbar from '../Navbar';

export default class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verifyToken: false
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

    setProductsName() {
        const params = this.props.match.params;
        const sectionName = params.sectionName;
        console.log(sectionName);
    }

    componentDidMount() {
        this.checkLocalStorage();
        this.setProductsName();
    }

    render() {
        const verifyToken = this.state.verifyToken;
        return (
            <div>
                <Navbar verifyToken={verifyToken} />
            </div>
        )
    }
}

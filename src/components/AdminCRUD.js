import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../css/adminCRUD.css';

export default class AdminCRUD extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            _id: '',
            name: '',
            quantity: 0,
            price: 0,
            imgUrl: '',
            valueFrom: 'school',
            file: '',
            nameAdd: '',
            priceAdd: '',
            quantityAdd: ''
        }
    }

    async fetchProducts() {
        const response = await fetch(`https://proyectobacktesis.herokuapp.com/api/product`);
        const products = await response.json();


        this.setState({
            products,
        });
    };

    searchFunction() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[1];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }       
        }
    }

    insertItem(item) {
        const { _id, name, quantity, price, imgUrl } = item;

        this.setState({
            _id, 
            name,
            quantity,
            price,
            imgUrl
        });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async onDeleteBtn() {
        if (this.state.name !== '') {
            const confirm = window.confirm('Estas seguro de borrarlo?');

        if (confirm) {
            
            await fetch(`https://proyectobacktesis.herokuapp.com/api/product/delete/${this.state._id}`, {
                method: 'delete'
            });
            this.notify('Se ha borrado correctamente');
            window.location.reload();
            }
        }
    }

    async onUpdateBtn() {
        if (this.state.name !== '') {
        const obj = { 
            name: this.state.name,
            quantity: this.state.quantity,
            price: this.state.price
        }

            await fetch(`https://proyectobacktesis.herokuapp.com/api/product/update/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(obj),
                headers: {
                    "content-type": "application/json"
                }
            });
            this.notify('Se ha actualizado correctamente');
            window.location.reload();
        }
    }

    handleChangeSelect(event) {
        this.setState({valueFrom: event.target.value});
    }

    notify = (text) => toast(text);
    componentDidMount() {
        this.fetchProducts();
    }


    handleLoadLocalFile(event) {
        event.preventDefault();
        const file = event.target.files[0];
        
        this.setState({
            file
        });
    }


    async onSubmitBtn() {
        const { nameAdd, quantityAdd, priceAdd, valueFrom: department, file} = this.state; 
        
        let formData = new FormData();
        formData.append('image', file);
        
        const newObj = JSON.stringify(
            {
                name: nameAdd,
                quantity: quantityAdd,
                price: priceAdd,
                department,
            }
        );
        formData.append('data', newObj);



        const savedProduct = await fetch('https://proyectobacktesis.herokuapp.com/api/product/add', {
            method: "POST",
            body: formData,
        });
        console.log(savedProduct);
    }
    
    render() {
        const products = this.state.products;
        return (
            <>
            <div className="adminCrudContainer">
                <div className="searchTable">
                    <div className="tableProductsSpace">
                        <div>
                        <input type="text" id="myInput" onChange={() => this.searchFunction()} placeholder="Buscar por Nombre" title="Type in a name" />
                        </div>
                        <table id="myTable">
                            <tr className="header">
                                <th>Imagen</th>
                                <th>Nombre</th>
                            </tr>
                                {products.map((item) => {
                                        return (
                                            <tr className="itemRow" onClick={() => this.insertItem(item)} key={item._id}>
                                                <td><img className="imgTable" src={`${item.imgUrl}`} alt=""/></td>
                                                <td>{item.name}</td>
                                            </tr>
                                        )
                                })
                                }
                        </table>
                    </div>
                </div>
                <div className="productInformationAdmin">
                    <div className="informationImg">
                        <img className="imgSizeInformation" src={this.state.imgUrl} alt=""/>
                    </div>
                    <div className="productInformationGeneral">
                        <div className="spaceGeneralData">
                            {`Nombre:`}
                            <input className="spaceInputs" type="text" onChange={(e) => this.handleChange(e)} name="name" id="" value={this.state.name}/>
                        </div>
                        <div className="spaceGeneralData">
                            {`Cantidad:`}
                            <input className="spaceInputs" type="number" onChange={(e) => this.handleChange(e)} name="quantity" id="" value={this.state.quantity}/>
                        </div>
                        <div className="spaceGeneralData">
                            {`Precio: `}
                            <input className="spaceInputs" type="number" onChange={(e) => this.handleChange(e)} name="price" id="" value={this.state.price}/>
                        </div>
                    </div>
                    <div className="btnSection">
                        <button className="deleteBtn" onClick={() => this.onDeleteBtn()}>Eliminar</button>
                        <button className="updateBtn" onClick={() => this.onUpdateBtn()}>Actualizar</button>
                    </div>
                </div>
                <ToastContainer
                            position="top-right"
                            autoClose={1500}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
            </div>
            <div>
                <div>Dar de Alta un nuevo producto</div>
                <div className="addProductSection">
                    <div>
                        <input type="file" alt="" onChange={(e) => this.handleLoadLocalFile(e)}/>
                    </div>
                    <div className="testDirection">
                        <span>Nombre: </span><input className="spaceBtnAdd" onChange={(e) => this.handleChange(e)} type="text" name="nameAdd" />
                        <span>Precio: </span><input className="spaceBtnAdd" onChange={(e) => this.handleChange(e)} type="number" name="priceAdd" />
                        <span>Cantidad: </span><input className="spaceBtnAdd" onChange={(e) => this.handleChange(e)} type="number" name="quantityAdd"/>
                        <select value={this.state.valueFrom} onChange={(e) => this.handleChangeSelect(e)}>
                            <option value="school">Escuela</option>
                            <option value="toys">Jugueteria</option>
                            <option value="office">Oficina</option>
                            <option value="gifts">Regalos</option>
                            <option value="shop">Shop</option>
                        </select>
                        <button className="btnAddFinal" onClick={() => this.onSubmitBtn()}>Agregar</button>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

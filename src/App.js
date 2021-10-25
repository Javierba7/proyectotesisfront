import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Section from './components/Section';
import Profile from './components/Profile';
import ShoppingCart from './components/ShoppingCart';
import AdminCRUD from './components/AdminCRUD';
import AdminItemRequest from './components/AdminItemRequest';

function App() {
  return (
    <div>
      <Router>
        <Route path="/" exact component={Dashboard}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/Register" exact component={Register}/>
        <Route path="/section/:sectionName" component={Section}/>
        <Route exact path="/profile" component={Profile}/>
        <Route exact path="/shoppingCart" component={ShoppingCart}/>
        <Route exact path="/admin/update" component={AdminCRUD} />
        <Route exact path="/admin/dashboard" component={AdminItemRequest} />
      </Router>
    </div>
  );
}

export default App;

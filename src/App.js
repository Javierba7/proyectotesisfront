import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Section from './components/Section';

function App() {
  return (
    <div>
      <Router>
        <Route path="/" exact component={Dashboard}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/Register" exact component={Register}/>
        <Route path="/section/:sectionName" component={Section}/>
      </Router>
    </div>
  );
}

export default App;

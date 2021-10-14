import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
  return (
    <div>
      <Router>
        <Route path="/" exact component={Dashboard}/>
        <Route path="/login" exact component={Login}/>
      </Router>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard';

function App() {
  return (
    <div>
      <Router>
        <Route path="/" exact component={Dashboard}/>
      </Router>
    </div>
  );
}

export default App;

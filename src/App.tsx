import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Index from './containers/Index';
import Lessons from './containers/Lessons';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/lessons" component={Lessons} />
        <Route path="/" component={Index} />
      </Switch>
    </Router>
  );
}

export default App;

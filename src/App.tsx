import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Index from './containers/Index';
import Lesson from './containers/Lesson';
import Lessons from './containers/Lessons';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/lessons" component={Lessons} />
        <Route path="/lesson/:id" component={Lesson} />
        <Route path="/" component={Index} />
      </Switch>
    </Router>
  );
}

export default App;

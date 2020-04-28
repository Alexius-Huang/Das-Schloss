import React from 'react';
import ReactDOM from 'react-dom';
import { IconContext } from 'react-icons';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from './reducers';
import * as serviceWorker from './serviceWorker';
import App from './App';
import './index.scss';

const store = createStore(RootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <IconContext.Provider value={{ className: 'react-icon' }}>
        <App />
      </IconContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

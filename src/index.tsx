import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import reduxLogger from 'redux-logger';
import { IconContext } from 'react-icons';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import RootReducer from './reducers';
import RootSaga from './saga';

import * as serviceWorker from './serviceWorker';
import './index.scss';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  RootReducer,
  applyMiddleware(sagaMiddleware, reduxLogger)
);

sagaMiddleware.run(RootSaga);

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

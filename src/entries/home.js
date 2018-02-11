import React from 'react';
import { render } from 'react-dom';
import Home from '../pages/containers/home'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers/index';
import { Map as map } from 'immutable';
import { normalize } from 'normalizr';

const logger = ({ getState, dispatch }) => next => action => {
  console.log('Estado Previo', getState().toJS());
  console.log('Acción', action);
  const value = next(action);
  console.log('Nuevo Estado', getState().toJS());
  return value;
}

const store = createStore(
  reducer,
  map(),
  applyMiddleware(logger),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const homeContainer = document.getElementById('home-container');

render(
  <Provider store={store}>
    <Home />
  </Provider>,
  homeContainer
);

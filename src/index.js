import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from '@reduxjs/toolkit';
import { userReducer } from './redux/reducer/reducer';
import { spinnerReducer } from './redux/reducer/spinner';
import { movieReducer } from './redux/reducer/movie'; // Import reducer mới
import thunk from 'redux-thunk';

const root = ReactDOM.createRoot(document.getElementById('root'));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let rootReducer = combineReducers({
  userReducer,
  spinnerReducer,
  movieReducer, // Thêm reducer mới vào đây
});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();

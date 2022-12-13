import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {CartProvider} from 'react-use-cart'
import reportWebVitals from './reportWebVitals';
import 'react-bootstrap'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
reportWebVitals();

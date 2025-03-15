import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // ✅ Import only once
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>  {/* ✅ Use only once here */}
            <App />
        </BrowserRouter>
    </Provider>
);

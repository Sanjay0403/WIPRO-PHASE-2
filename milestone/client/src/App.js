import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Support from './pages/Support';
import Services from './pages/Services';
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
    return (
        <Provider store={store}>
            <Header />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/support" element={<Support />} />
                    
                    {/* ✅ Protecting Dashboard */}
                    <Route path="/dashboard" element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } />
                </Routes>
            </div>
            <Footer />
        </Provider>
    );
};

export default App;

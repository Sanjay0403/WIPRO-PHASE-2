import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Register.css'; // Ensure styles apply only to Register

const Register = () => {
    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Create an Account</h2>
                <form>
                    <div className="register-form-group">
                        <label>Full Name</label>
                        <input type="text" className="register-input" placeholder="Enter full name" required />
                    </div>
                    <div className="register-form-group">
                        <label>Email</label>
                        <input type="email" className="register-input" placeholder="Enter email" required />
                    </div>
                    <div className="register-form-group">
                        <label>Password</label>
                        <input type="password" className="register-input" placeholder="Create password" required />
                    </div>
                    <button type="submit" className="register-btn">Sign-up</button>
                </form>
                <p className="register-link">Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;

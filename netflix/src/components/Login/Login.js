import React from 'react';
import './login.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
    email: '',
    password: '',
};

const Login = () => {
    const navigate = useNavigate();
    const [fields, setFields] = useState(initialState);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const payload = {
                email: fields.email,
                password: fields.password,
            };
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const getData = await response.json();
            if (response.status === 200) {
                if (fields.email === "im@dmin.com" && fields.password === "admin123") {
                    console.log(response)
                    localStorage.setItem('user', JSON.stringify(getData.data[0].id));
                    localStorage.setItem('role', 'admin');
                    toast.success("Logged in as admin"); // Show admin login success
                    navigate('/dashboard'); // Navigate to dashboard for admin

                } else {
                    console.log(getData.data);
                    //temporary storage of data
                    localStorage.setItem('user', JSON.stringify(getData.data[0].id));
                    localStorage.setItem('role', 'user');
                    toast.success(getData.message); // Show user login success
                    navigate('/home'); // Navigate to home for normal user
                }
            } else if (response.status === 422) {
                toast.error(getData.message); // Show error message for validation error
            } else {
                alert("Login failed. Please try again."); // Show generic error message
            }

        } catch (error) {
            console.log(error);
            console.error('Error while making the API call:', error);
        }
    };
    const handleChange = (e) => {
        setFields({ ...fields, [e.target.name]: e.target.value });
    };

    return (
        <div className="Login">
            <div className="top">
                <div className="wrapper">
                    <img
                        className="logo"
                        src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
                        alt=""
                    />
                </div>
            </div>

            <div className="container">
                <form>
                    <h1>Sign In</h1>
                    <input type="email" name="email" onChange={handleChange} placeholder="Email or phone number" />
                    <input type="password" name="password" onChange={handleChange} placeholder="Password" />
                    <button className="loginButton" onClick={handleLogin}>
                        Sign In
                    </button>
                    <span>
                        New to Netflix?{' '}
                        <b
                            onClick={() => {
                                navigate('/register');
                            }}
                        >
                            Sign up now.
                        </b>
                    </span>
                    <small>
                        This page is protected by Google reCAPTCHA to ensure you're not a bot. <b>Learn more</b>.
                    </small>
                </form>
            </div>
        </div>
    );
};

export default Login;

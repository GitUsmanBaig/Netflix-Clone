import React from 'react'
import './register.scss'
import { useRef, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Navigate, useNavigate } from 'react-router-dom'

const initalstate = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    ischeck: false
}

const Register = () => {

    const navigate = useNavigate();

    const [fields, setFields] = useState(initalstate);


    const handleChange = (event) => {
        setFields({
            ...fields,
            [event.target.name]: event.target.value
        })

    }
    const handlenext = () => {
        if (fields.firstName != '' && fields.lastName != '') {
            setFields({
                ...fields,
                ischeck: true
            })
        }
    }

    const signUp = async (event) => {
        event.preventDefault(); // Prevent form submission behavior
        try {
            const payload = {
                first_name: fields.firstName,
                last_name: fields.lastName,
                email: fields.email,
                password: fields.password
            };
            const response = await axios.post('http://localhost:3001/create', payload);
            console.log('api called', response);
    
            const getData = response.data;
            console.log( getData.message);
            if (getData.status === 200) {
                toast.success(getData.message); // Show success message
                navigate('/login'); // Navigate to login page
            } else {
                toast.error(getData.message); // Show error message
            }
        } catch (error) {
            console.error('Error while making the API call:', error);
        }
    }; 
    
    return (
        <div className='Register'>
            <div className='top'>
                <div className='wrapper'>
                    <img className='logo'
                        src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png'
                        alt=''
                    />
                    <button className='loginButton'>Sign In</button>
                </div>
            </div>

            <div className='container'>
                <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <p>Ready to watch? Enter your email to create or restart your membership.</p>
                <>
                    {fields.ischeck === false &&
                        <div className='input'>
                            <input type='text' placeholder='First Name' name='firstName' value={fields.firstName} onChange={handleChange} />
                            <input type='text' placeholder='Last Name' name='lastName' value={fields.lastName} onChange={handleChange} />
                            <button className='registerbutton' onClick={handlenext} >
                                Next
                            </button>
                        </div>
                    }

                    {fields.ischeck == true &&
                        <form className='input'>
                            <input type='email' placeholder='Email Address' name='email' value={fields.email} onChange={handleChange} />
                            <input type='password' placeholder='password' name='password' value={fields.password} onChange={handleChange} />
                            <button type="button" className='registerbutton' onClick={signUp} >
                                Start
                            </button>

                        </form>
                    }
                </>
            </div>
        </div>
    )
}

export default Register

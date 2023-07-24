import React, { useEffect } from 'react'
import './updateuser.scss'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import {toast} from 'react-toastify'


const initalstate = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    ischeck: false
}

const UpdateUser = () => {
    const navigate = useNavigate();

    const [fields, setFields] = useState(initalstate);


    useEffect(() => {

        const id = localStorage.getItem('user');
        if(id){
            getdata(id);
        }
        else{
            navigate('/login');
        }
    }, [])



    const handleChange = (event) => {
        setFields({
            ...fields,
            [event.target.name]: event.target.value
        })

    }

    const getdata = async (id) => {
        const data = await fetch(`http://localhost:3001/getinduser/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const getData = await data.json();
        console.log(getData);
        if (getData.status === 200) {
            setFields({
                ...fields,
                firstName: getData.data[0].first_name,
                lastName: getData.data[0].last_name,
                email: getData.data[0].email,
                password: getData.data[0].password
            })
        }
        else {
            alert(getData.message); // Show error message
        }
    }


    const Update = async () => {
        const id = localStorage.getItem('user');
        try {
            const payload = {
                first_name: fields.firstName,
                last_name: fields.lastName,
                email: fields.email,
                password: fields.password
            };
            const response = await fetch(`http://localhost:3001/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const getData = await response.json();
            console.log(getData.message);
            if (getData.status === 200) {
                toast.success(getData.message); // Show success message
                navigate('/home');
                
            }
            else {
                toast.error(getData.message); // Show error message
            }
        } catch (error) {
            console.error('Error while making the API call:', error);
        }
    }; 


    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className='Update'>
                <div className='container'>
                    <h1>Update your account</h1>
                    <div className='Name'>
                        <input type='text' placeholder="First Name" name='firstName' value={fields.firstName} onChange={handleChange}  />
                        <input type='text' placeholder="Last Name" name='lastName' value={fields.lastName} onChange={handleChange} />
                    </div>
                    <div className='Email'>
                        <input type='email' placeholder="Email" name='email' value={fields.email} onChange={handleChange} />
                        <input type='password' placeholder='New password' name='password' value={fields.password} onChange={handleChange} />
                    </div>
                    <button className='button' onClick={Update}>UpdateInfo</button>
                </div>
            </div>
        </>
    )
}

export default UpdateUser

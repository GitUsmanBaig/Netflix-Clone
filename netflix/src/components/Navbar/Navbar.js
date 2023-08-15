import React, { useState, useEffect } from 'react'
import './navbar.scss'
import {ArrowDropDownRounded, Notifications, Search } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {

    const navigate = useNavigate();

    let initalstate= false;
    const [isScroll, setIsScroll] = useState(initalstate);

    //listen to our scroll ,when ever we scroll this function would be called
    window.onscroll = () => {
        setIsScroll(window.scrollY == 0 ? false : true);
        return ()=> (window.onscroll = null);
    };
    console.log(isScroll);

    return (
        <div className= { isScroll ? 'navbar scrolled' :'navbar'}>
            <div className='container'>
                <div className='Left'>
                    <img src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png' alt='' />
                    
                    <span onClick={()=>{
                        navigate('/home');
                    }} > Home</span>
                    <span>Series</span>
                    <span>Movies</span>
                    <span>New and Popular</span>
                    <span>My List</span>
                </div>
                <div className='Right'>
                    <Search className='icon'/>
                    <span>KID</span>
                    <Notifications className='icon'/>
                    <img src='https://logowik.com/content/uploads/images/netflix4627.jpg' alt='' />
                    <div className='profile'>
                      { localStorage.getItem('user') ?<>
                      <ArrowDropDownRounded className='icon'/>
                        <div className='options'>
                            <span onClick={
                                ()=>{
                                    navigate('/UpdateUser');
                                }
                            }>Settings</span>
                            <span onClick={()=>{
                                navigate('/login');
                            }}>Logout</span>
                        </div></> :<button>Sign in</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar

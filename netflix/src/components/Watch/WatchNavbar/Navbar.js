import React, { useState, useEffect } from 'react'
import './navbar.scss'
import { ArrowDropDownRounded, Notifications, Search, ArrowBackOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'



const Navbar = () => {

    const navigate = useNavigate();

    let initalstate = false;
    const [isScroll, setIsScroll] = useState(initalstate);

    //listen to our scroll ,when ever we scroll this function would be called
    window.onscroll = () => {
        setIsScroll(window.scrollY == 0 ? false : true);
        return () => (window.onscroll = null);
    };
    console.log(isScroll);

    const backButton = () => {
        navigate('/home');
    }

    return (
        <div className={isScroll ? 'navbar scrolled' : 'navbar'}>
            <div className='container'>
                <div className='Left'>
                    <ArrowBackOutlined className='BackButton' onClick={backButton}/>
                    <img src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png' alt='' />

                    {/* <span onClick={()=>{
                        navigate('/home');
                    }} > Home</span> */}
                </div>
                <div className='Right'>
                    {/* <Search className='icon'/>
                    <span>KID</span> */}
                    <img src='https://logowik.com/content/uploads/images/netflix4627.jpg' alt='' />
                    <div className='profile'>
                        <ArrowDropDownRounded className='icon' />
                        <div className='options'>
                            <span>Settings</span>
                            <span>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar

import React from 'react'
import './watch.scss'
import { ArrowBackOutlined } from '@mui/icons-material'
import ReactPlayer from 'react-player';
import Navbar from './WatchNavbar/Navbar';

const Watch = () => {
    return (
        <div className='page'>
            <nav className='navbar'>
                <Navbar />
            </nav>
            <div className='watch'>
                <ReactPlayer className='video'
                    url="https://www.youtube.com/embed/b9EkMc79ZSU"
                    width="100%"
                    height="90vh"
                    controls={true}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen={true}
                />
            </div>
        </div>

    )
}

export default Watch

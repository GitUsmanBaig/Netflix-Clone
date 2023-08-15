import React, { useEffect, useState } from 'react'
import { ArrowBackOutlined } from '@mui/icons-material'
import ReactPlayer from 'react-player';
import Navbar from './WatchNavbar/Navbar';
import './watch.scss'
import { useNavigate, useParams } from 'react-router-dom';




const Watch = () => {

    const [movie, setMovie] = useState({}); // State variable for storing movie data

    const {id} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if(id){
            getData(id);
        }
        else{
            navigate("./Home");
        }
    }, [id])

    const getData = async (id) => {
        const data = await fetch(`http://localhost:3001/getindmovie/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const getData = await data.json();
        console.log(getData);
        console.log(getData.status);
        if (getData.status === 200) {
            setMovie(getData.data[0])
            console.log(getData.data)
        }
        else {
            alert(getData.message); // Show error message
        }
    }

    return (
        <div className='page'>
            <nav className='navbar'>
                <Navbar />
            </nav>
            <div className='watch'>
                <ReactPlayer className='video'
                    url={movie.video}
                    width="70%"
                    height="50vh"
                    controls={true}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen={true}
                />
            </div>
            <div className='information'>
                <div className='info'>
                    <span> Name: {movie.name}</span>
                    <span> Time: 1 hour 14 mins</span>
                    <span className='limit'>+16</span>
                    <span>Year: {movie.year}</span>
                </div>
                <div className='desc'>
                    <span>Description:</span>
                    <p >
                        {movie.description}
                    </p>
                </div>
            </div>
        </div>

    )
}

export default Watch

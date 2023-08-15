import React, { useEffect } from 'react'
import './Featured.scss'
import { InfoOutlined, PlayArrow, Star } from '@mui/icons-material'
import { useState } from 'react'
import Axios from './axios/Axios'
import requests from './axios/Request'
import { useNavigate } from 'react-router-dom'



//Function for API call
const Featured = ({ type }) => {
    const navigate = useNavigate();

    const [movie, setMovie] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            const request = await Axios.get(requests.fetchNetflixOriginals);
            setMovie(
                //generating a random number from the total videos send from API
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchdata();
    }, []);

    console.log(movie);
    //API work ends here


    return (
        <>
            <div className='featured'>
                {
                    type && (
                        <div className='category'>
                            <span>{type === 'movie' ? 'Movies' : 'Series'}</span>
                            <select name='genre' id='genre'>
                                <option>Genre</option>
                                <option value='adventure'>Adventure</option>
                                <option value='comedy'>Comedy</option>
                                <option value='crime'>Crime</option>
                                <option value='fantasy'>Fantasy</option>
                                <option value='historical'>Historical</option>
                                <option value='horror'>Horror</option>
                                <option value='romance'>Romance</option>
                                <option value='sci-fi'>Sci-fi</option>
                                <option value='thriller'>Thriller</option>
                                <option value='western'>Western</option>
                                <option value='animation'>Animation</option>
                                <option value='drama'>Drama</option>
                                <option value='documentary'>Documentary</option>
                            </select>
                        </div>
                    )
                }
                <img 
                    height="100%"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
                        backgroundSize: "cover",
                    }}
                    alt=""
                />
                <div className='info'>
                    {/* //set the logo image on the screen */}
                    <div className='logo'>
                        {movie?.name || movie?.title || movie?.original_name}

                    </div>
                    <span className='desc'>
                        {movie?.overview}
                    </span>
                    <span>
                        <Star className='staricon' />
                        {movie?.vote_average}
                    </span>
                    <div className='buttons'>
                        <button className='Play' onClick={()=>{
                            navigate('/watch')
                        }}>
                            <PlayArrow /> Play
                        </button>
                        <button className='More'>
                            <InfoOutlined /> Info
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Featured


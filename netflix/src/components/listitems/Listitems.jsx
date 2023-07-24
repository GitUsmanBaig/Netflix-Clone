import React, { useState, useEffect } from 'react';
import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined } from '@mui/icons-material';
import ReactPlayer from 'react-player';
import './Listitems.scss';

const Listitems = ({ index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [randomMovie, setRandomMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const onMouseEnter = () => {
    setIsHovered(true);
    setPlaying(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
    setPlaying(true);
  };

  useEffect(() => {
    setPlaying(false);
    // Fetch the list of movies from the database here and set the random movie
    fetchMovies();
  }, []);

  // Function to fetch the list of movies from the database
  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:3001/getmovie', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const res = await response.json();
      if (res.status === 200) {
        const randomIndex = Math.floor(Math.random() * res.data.length);
        console.log(randomIndex)
        setRandomMovie(res.data[randomIndex]);
        setLoading(false);
      } else {
        console.log('No movie data found');
        setLoading(false);
      }
    } catch (error) {
      console.log('Error fetching movie data:', error);
      setLoading(false);
    }
  };
  
  return (
    <div
      className='ListItems'
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {loading ? (
        <div className='loading'>Loading...</div>
      ) : randomMovie ? (
        <>
          <img src={randomMovie.image} alt='' />
          {isHovered && (
            <>
              <div className='player-wrapper'>
                <ReactPlayer
                  url={randomMovie.video}
                  width="100%"
                  height="100%"
                  controls={true}
                  playing={playing}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen={true}
                />
              </div>
              <div className='iteminfo'>
                <div className='icons'>
                  <PlayArrow className='icon' />
                  <Add className='icon' />
                  <ThumbUpAltOutlined className='icon' />
                  <ThumbDownAltOutlined className='icon' />
                </div>
                <div className='itemInfoTop'>
                  <span>{randomMovie.duration}</span>
                  <span className='Limit'>{randomMovie.age_limit}</span>
                  <span>{randomMovie.year}</span>
                </div>
                <div className='desc'>
                  {randomMovie.description}
                </div>
                <div className='genre'>
                  {randomMovie.genre}
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div>No movie data available</div>
      )}
    </div>
  );
};

export default Listitems;

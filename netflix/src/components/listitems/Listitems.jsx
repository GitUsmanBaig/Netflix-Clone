import React, { useState, useEffect } from 'react';
import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined } from '@mui/icons-material';
import ReactPlayer from 'react-player';
import Watch from '../Watch/Watch';
import './Listitems.scss';
import { Link, useNavigate } from 'react-router-dom';

const Listitems = ({ index , item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectMovie, setSelectMovie] = useState({});

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
  }, []);

  const navigate = useNavigate();

  return (
    <div
      className='ListItems'
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {loading ? (
        <div className='loading'>Loading...</div>
      ) : item ? (
        <>
          <img src={item.image} alt='' />
          {isHovered && (
            <>
              <div className='player-wrapper'>
                <ReactPlayer
                  url={item.video}
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
                  <PlayArrow className='icon' onClick={() => {
                        navigate(`/watch/${item.id}`)
                  }
                  }/>
                  <Add className='icon' />
                  <ThumbUpAltOutlined className='icon' />
                  <ThumbDownAltOutlined className='icon' />
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

import React, { useEffect, useRef, useState } from 'react'
import './List.scss'
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@mui/icons-material'
import ListItem from '../listitems/Listitems.jsx'

const List = ({ genre, movie }) => {
    //state of sliding so it deosnot extend from the movie list and shows blank space 
    const [slideNum, setSlideNum] = useState(0);

    const [isMoved, setIsMoved] = useState(false);

    const listRef = useRef();

    const HandleClick = (direction) => {
        setIsMoved(true);
        //to move the videos left and right with arrow click
        let distance = listRef.current.getBoundingClientRect().x - 50;
        if (direction === 'back' && slideNum > 0 ) {
            setSlideNum(slideNum - 1);
            listRef.current.style.transform = `translateX(${230 + distance}px)`
        }
        if (direction === 'forward' && slideNum < 5) {
            setSlideNum(slideNum + 1);
            listRef.current.style.transform = `translateX(${-230 + distance}px)`
        }
    }
    return (
        <div className='List'>
            <span className='Listtype'>
                {genre}
            </span>
            <div className='wrapper'>
                <ArrowBackIosOutlined
                    className='sliderArrow back'
                    onClick={() => HandleClick("back")}
                    //to remove arrow when it reaches eiter end at max so that we cannot scroll
                    style={{ display: !isMoved && "none" }}
                />
                <div className='container' ref={listRef}>
                    {movie.length>0 &&
                        movie.map((item, index) =>
                            <ListItem index={index} item={item} />
                        )
                    }
                </div>
                <ArrowForwardIosOutlined className='sliderArrow forward'
                    onClick={() => HandleClick("forward")}
                />
            </div>
        </div>
    )
}

export default List

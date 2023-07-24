import React, { useEffect } from 'react'
import './addmovie.scss'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Select from 'react-select'

const options = [
    { value: 'adventure', label: 'Adventure' },
    { value: 'comedy', label: 'Comedy' },
    { value: 'crime', label: 'Crime' },
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'historical', label: 'Historical' },
    { value: 'horror', label: 'Horror' },
    { value: 'romance', label: 'Romance' },
    { value: 'sci-fi', label: 'Sci-fi' },
]

const initalstate = {
    Movie_Name: '',
    Movie_genre: '',
    Movie_year: '',
    Movie_rating: '',
    Movie_actors: '',
    Movie_description: '',
    Movie_image: '',
    Movie_video: '',
    Movie_ischeck: false
}

const AddMovie = () => {
    const navigate = useNavigate();

    const [fields, setFields] = useState(initalstate);

    //to handke change in fields
    const handleChange = (event) => {
        setFields({
            ...fields,
            [event.target.name]: event.target.value
        })

    }

    //to handle select
    const handleSelect = (options,htmlElement) => {
        console.log(htmlElement, options)
        setFields({
            ...fields,
            [htmlElement.name]: options.value
        })
    }

    const registerMovie = async (event) => {
        event.preventDefault(); // Prevent form submission behavior
        try {
            const payload = {
                name: fields.Movie_Name,
                genre: fields.Movie_genre,
                year: fields.Movie_year,
                rating: fields.Movie_rating,
                description: fields.Movie_description,
                image: fields.Movie_image,
                video: fields.Movie_video,
                actors: fields.Movie_actors,
            };
            const response = await fetch(`http://localhost:3001/createmovie`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const getData = await response.json();
            console.log(getData.message);
            if (getData.status === 200) {
                toast.success(getData.message); // Show success message
                navigate('/dashboard');
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
            <div className='Update'>
                <div className='container'>
                    <h1>Add Movie</h1>
                    <form className='Name'>
                        <input type='text' placeholder="Name" name='Movie_Name' value={fields.Movie_Name} onChange={handleChange} />
                        <input type='text' placeholder="Year" name='Movie_year' value={fields.Movie_year} onChange={handleChange} />
                    </form>
                    <div className='Email'>
                        <input type='text' placeholder="Actors" name='Movie_actors' value={fields.Movie_actors} onChange={handleChange} />
                        <input type='text' placeholder='Rating' name='Movie_rating' value={fields.Movie_rating} onChange={handleChange} />
                    </div>
                    <div className='genres'>
                        <Select className='genre'
                            options={options}
                            name='Movie_genre'
                            value={options.find(obj => obj.value === fields.Movie_genre)}
                            onChange={handleSelect}
                            placeholder='Genre'
                        />
                    </div>
                    <div className='content'>
                        <input type='text' placeholder="Image" name='Movie_image' value={fields.Movie_image} onChange={handleChange} />
                        <input type='text' placeholder='Video' name='Movie_video' value={fields.Movie_video} onChange={handleChange} />
                    </div>
                    <div className='Description'>
                        <input type='text' placeholder="Description" name='Movie_description' value={fields.Movie_description} onChange={handleChange} />
                    </div>
                    {/* <button className='button' onClick={Update}>UpdateInfo</button> */}
                    <button className='button' onClick={registerMovie}>UpdateInfo</button>
                </div>
            </div>
        </>
    )
}

export default AddMovie;


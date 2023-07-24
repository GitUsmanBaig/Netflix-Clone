import React, { useEffect } from 'react'
import './updatemovie.scss'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import { toast } from 'react-toastify'
import Select from 'react-select'
import Dashboard from '../Dashboard/Dashboard'

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

const UpdateMovie = () => {
    const navigate = useNavigate();

    const [fields, setFields] = useState(initalstate);


    useEffect(() => {
        const id = localStorage.getItem('movie');
        if (id) {
            getdata(id);
        }
        else {
            navigate('/dashboard');
        }
    }, [])



    const handleChange = (event) => {
        setFields({
            ...fields,
            [event.target.name]: event.target.value
        })

    }

    //to handle select
    const handleSelect = (options, htmlElement) => {
        console.log(htmlElement, options)
        setFields({
            ...fields,
            [htmlElement.name]: options.value
        })
    }


    const getdata = async (id) => {
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
            setFields({
                ...fields,
                Movie_Name: getData.data[0].name,
                Movie_genre: getData.data[0].genre,
                Movie_year: getData.data[0].year,
                Movie_rating: getData.data[0].rating,
                Movie_description: getData.data[0].description,
                Movie_image: getData.data[0].image,
                Movie_video: getData.data[0].video,
                Movie_actors: getData.data[0].actors,
            })
        }
        else {
            alert(getData.message); // Show error message
        }
    }


    const Update = async () => {
        const id = localStorage.getItem('movie');
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
            const response = await fetch(`http://localhost:3001/updatemovie/${id}`, {
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
                localStorage.removeItem('movie');
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
                    <h1>Update Movie</h1>
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
                            onChange={handleSelect}
                            placeholder='Genre'
                            value={options.find(obj => obj.value === fields.Movie_genre)}
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
                    <button className='button' onClick={Update}>UpdateInfo</button>
                </div>
            </div>
        </>
    )
}

export default UpdateMovie

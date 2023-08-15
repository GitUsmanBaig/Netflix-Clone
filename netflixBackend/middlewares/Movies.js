const express = require('express');
const Router = express.Router();
const Conn = require('../db/Conn');

/*This route is for creating movies */
exports.createMovie = (req, res) => {
    console.log(req.body);
    const { name, genre, year, rating, description, image, video, actors } = req.body;
    if (!name || !genre || !year || !rating || !description || !image || !video || !actors) {
        return res.status(422).json({ data: [], message: "Please fill all the fields", status: 422 });
    }
    else {
        Conn.query('INSERT INTO movies SET ?', { name: name, genre: genre, year: year, rating: rating, description: description, image: image, video: video, actors: actors }, (error, results) => {
            if (error) {
                return res.status(422).json({ data: [], message: "Invalid!", status: 422 });
            }
            else {
                return res.status(200).json({ data: [], message: "Movie registered successfully:", status: 200 });
            }
        });
    }
}

/*This route is used to fetch data of all the movies */
exports.FetchMovies = (req, res) => {
    Conn.query('SELECT * FROM movies', (error, results) => {
        if (error) {
            return res.status(422).json({ data: [], message: "Cannot Find Movies", status: 422 });
        }
        else {
            console.log(results);
            return res.status(200).json({ data: results, message: "Movies data fetched successfully:", status: 200 });
        }
    });
}


/*This code is to get single Movie */
exports.FetchSingleMovie = (req, res) => {
    const id = req.params.id;
    Conn.query('SELECT * FROM movies WHERE id = ?', [id], (error, results) => {
        if (error) {
           return res.status(422).json({ data: [], message: "Cannot Find Movie Id!", status: 422 }); 
        }
        else{
            res.status(200).json({ data: results, message: "Movie data fetched successfully:", status: 200 });
        }
    });
}


/*This code is to delete the Movie*/
exports.DeleteMovie = (req, res) => {
    const id = req.params.id;
    Conn.query('DELETE FROM movies WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(422).json({ data: results.data, message: "Cannot Find Movie Id!", status: 422 });
        }
        else {
            console.log(results.data);
            return res.status(200).json({ data: results.data, message: "ID: "  + id + " deleted successfully:", status: 200 });
        }
    });
}


/*Update Movie Data*/
exports.UpdateMovie = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        Conn.query('UPDATE movies SET ? WHERE id = ?', [data, id], async (error, results) => {
            if (error) {
                return res.status(204).json({ data: [], message: "Update Failed!", status: 204 });
            }
            else {
                if (results.affectedRows > 0) {
                    return res.status(200).json({ data: [], message: data.name +  " updated successfully:", status: 200 });
                }
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}

/*count total movies*/
exports.CountMovies = (req, res) => {
    try {
        Conn.query('SELECT COUNT(*) AS TOTAL_MOVIE FROM movies', (error, results) => {
            if (error) {
                return res.status(422).json({ data: [], message: "Cannot Find Movies", status: 422 });
            }
            else{
                return res.status(200).json({ data: results, message: "Total Movies:", status: 200 });
            }
        });
    }catch (err) {
        console.log(err);
    }
}


exports.FetchMovieGenre = (req, res) => {
    try {
        Conn.query('SELECT DISTINCT genre FROM movies', (error, genres) => {
            if (error) {
                console.log(error);
                return res.status(422).json({ data: [], message: "Cannot Find Genre", status: 422 });
            }

            const array = [];

            let completedQueries = 0;

            const handleQueryResult = (genre, movies) => {
                array.push({ genre, data: movies });

                completedQueries++;
                if (completedQueries === genres.length) {
                    return res.status(200).json({ data: array, message: "Genres Found!", status: 200 });
                }
            };

            for (let i = 0; i < genres.length; i++) {
                const genre = genres[i].genre;

                Conn.query('SELECT * FROM movies WHERE genre = ?', [genre], (error, movies) => {
                    if (error) {
                        console.log(error);
                        handleQueryResult(genre, []);
                    } else {
                        handleQueryResult(genre, movies);
                    }
                });
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(422).json({ data: [], message: "Cannot Find Genre", status: 422 });
    }
};




exports.FetchMoviesWithGenre = (req, res) => {
    try{
        Conn.query('SELECT * FROM movies WHERE genre = ?', [req.params.genre], (error, results) => {
            if(error){
                return res.status(422).json({ data: [], message: "Cannot Find movies of this genre", status: 422 });
            }
            else{
                return res.status(200).json({ data: results, message: "Movies Found!", status: 200 });
            }
        });

    }catch (err) {
        console.log(err);
    }
}

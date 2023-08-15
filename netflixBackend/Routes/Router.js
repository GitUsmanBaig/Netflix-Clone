const express = require('express');
const Router = express.Router();
const Conn = require('../db/Conn');
const { createUser, FetchUsers, LoginUser, FetchSingleUser, DeleteUser, UpdateUser, CountUsers } = require('../middlewares/User');
const { createMovie, FetchMovies, FetchSingleMovie, DeleteMovie, UpdateMovie, CountMovies, FetchMovieGenre, FetchMoviesWithGenre } = require('../middlewares/Movies');


//----------------Users-----------------//

//create user
Router.post('/create',createUser);

//get users data
Router.get('/getuser', FetchUsers);

//get data of single user
Router.post('/login', LoginUser);

//get single user id
Router.get('/getinduser/:id',FetchSingleUser);

//delete user
Router.delete('/delete/:id', DeleteUser);

//update user data
Router.put('/update/:id', UpdateUser);

//count total users
Router.get('/countusers', CountUsers);



//----------------Movies-----------------//

//create Movie
Router.post('/createmovie',createMovie);

//get all movies data
Router.get('/getmovie', FetchMovies);

//get single movie data
Router.get('/getindmovie/:id', FetchSingleMovie);

//delete movie
Router.delete('/deletemovie/:id', DeleteMovie);

//updatw movie data
Router.put('/updatemovie/:id', UpdateMovie);

//count total movies
Router.get('/countmovie', CountMovies);

//get movie genre
Router.get('/getmoviegenre', FetchMovieGenre);

//get movies with genre
Router.get('/getmovieswithgenre/:genre', FetchMoviesWithGenre);

//get array of moives in a genre
// Router.get('/getmovieslistwithgenre/:genre', FetchListMoviesWithGenre);


module.exports = Router;
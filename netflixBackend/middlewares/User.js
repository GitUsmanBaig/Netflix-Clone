const express = require('express');
const Router = express.Router();
const Conn = require('../db/Conn');
const bcrypt = require('bcrypt');


/* This route is for creating user */
exports.createUser = (req, res) => {

    console.log(req.body);

    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
        return res.status(422).json({ data: [], message: "Please fill all the fields", status: 422 });
    }
    //password encryption
    const hashpassword = bcrypt.hashSync(password, 10);

    try {
        Conn.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            if (results.length) {
                return res.status(422).json({ data: [], message: "User already exists", status: 422 });
            }
            else {
                Conn.query('INSERT INTO users SET ?', { first_name: first_name, last_name: last_name, email: email, password: hashpassword }, (error, results) => {
                    if (error) {
                        console.log(error);
                    }
                    else {

                        console.log(results);
                        if (results.affectedRows > 0) {
                            return res.status(200).json({ data: [], message: "User registered successfully:", status: 200 });
                        }

                    }
                });
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}


/*This route is used to fetch data of all the users */
exports.FetchUsers = (req,res) => {
    Conn.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(results);
            return res.status(200).json({ data: results, message: "User data fetched successfully:", status: 200 });
        }
    });
}

/* This route is to Login the user*/
exports.LoginUser = (req,res) => {
    //destructered the object values
    try{
        const {email,password} = req.body;
        const data = Conn.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            if (error) {
                console.log(error);
            }
            else {
                if(results.length > 0){
                    const compare = await bcrypt.compare(password, results[0].password);
                    console.log(password);
                    console.log(results[0].password)
                    console.log(compare);
                    if(compare){
                        return res.status(200).json({ data: results, message: "User logged in successfully:", status: 200 });
                    }
                    else{
                        return res.status(422).json({ data: results, message: "Invalid credentials", status: 422 });
                    }
                }
                else{
                    return res.status(422).json({ data: results, message: "Invalid credentials", status: 422 });
                }
            }
        });
    }
    catch(error){
        console.log(error)
    }
}

/*This code is to get single User */
exports.FetchSingleUser =  (req,res) => {
    const id = req.params.id;
    Conn.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.log(error);
        }
        else{
            res.status(200).json({ data: results, message: "User data fetched successfully:", status: 200 });
        }
    });
}

/*This code is to delete the user*/
exports.DeleteUser = (req,res) => {
    const id = req.params.id;
    Conn.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(results.data);
            return res.status(200).json({ data: [], message: "ID: "  + id + " deleted successfully:", status: 200 });
        }
    });
}

/*Update User Data*/
exports.UpdateUser = (req,res) => {
    const id = req.params.id;
    const data = req.body;
    const hashpassword = bcrypt.hashSync(data.password, 10);
    data.password = hashpassword;
    try {
        Conn.query('UPDATE users SET ? WHERE id = ?', [data, id], async (error, results) => {
            if (error) {
                return res.status(204).json({ data: [], message: "Update Failed!", status: 204 });
            }
            else {
                if (results.affectedRows > 0) {
                    return res.status(200).json({ data: [], message: data.first_name +  " updated successfully:", status: 200 });
                }
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}

/*count total users*/
exports.CountUsers = (req,res) =>{
    try {
        Conn.query('SELECT COUNT(*) AS TOTAL_USERS FROM users', (error, results) => {
            if (error) {
                return res.status(422).json({ data: [], message: "Cannot Find Users", status: 422 });
            }
            else{
                return res.status(200).json({ data: results, message: "Total Users:", status: 200 });
            }
        });
    }catch (err) {
        console.log(err);
    }
}
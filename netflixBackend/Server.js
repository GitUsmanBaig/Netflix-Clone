const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const bodyparser = require('body-parser');
require ('./db/Conn');
const Router = require ('./Routes/Router');

const port = 3001;

//middleware
app.use(express.json());
app.use(cors());

app.use(Router);
app.use(bodyparser.urlencoded({extended:true}));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);

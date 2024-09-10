// Setting up Express
const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

// Middleware for to get and format data from page
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connecting and Setup of Database
const db = require('./config/mongoose');

app.use('/' , require('./routes/index'));

app.listen(port , function(err){

    if(err){
        console("Error in running the server");
    }
      
    console.log(`Server is running on port ${port}`);

});


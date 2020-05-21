const express = require('express');
const middlewaresConfig  = require('./config/middlewares');
const  rotasAPI  = require('./api');


const app = express();
middlewaresConfig (app); 
rotasAPI(app); 


const PORT = process.env.PORT || 4000;
app.listen(PORT, err => {
    if (err) {
        throw err;
    } else {
        console.log(`O servidor esta rodando na ${PORT}`)
    }
});
const express = require('express')
const cors = require('cors')
// require('dotenv').config();
const app = express()
const port = 8000;
const db = require('./config/mongoose');
const passportJWT = require('./config/passport-jwt-strategy');

app.use(cors());
app.use(express.json());

app.use('/',require('./routes'))

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server ${err}`);
    }else{
        console.log(`Server is up and running on port ${port}`);
    } 
})
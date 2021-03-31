const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/TraWell',{useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true});

const db = mongoose.connection;

db.on('error',console.log.bind(console,"Error connecting db"));
db.once('open',function(){
    console.log(`Connected to db`);
});

module.exports = db;
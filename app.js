const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');//parses incoming data
const cors = require('cors'); //allows to call different domain name
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/mongodb');

mongoose.connect(config.database, {
    useNewUrlParser: true
});

mongoose.connection.on('connected', ()=>{
    console.log('connected to ' + config.database);
})

mongoose.connection.on('error', (err)=>{
    console.log('connetion error ' + err);
})

const app = express();

//custom routes
const usersRts = require('./routes/users');

const port = 3000;

//handl cors
app.use(cors());

//body parser
app.use(bodyParser.json());

//use passport
app.use(passport.initialize());
app.use(passport.session());


//user routes
app.use('/users', usersRts);

//use static files
app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) =>{
    res.send('invalid endpoint')
})

app.listen(port, () => {
console.log('server started on port ' + port);

})

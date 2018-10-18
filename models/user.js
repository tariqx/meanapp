const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/mongodb')

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})

const user = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = (id, callback)=>{
    user.findById(id, callback);
}

module.exports.getUserByUserName = (username, callback)=>{
    const query = {
        username: username
    }
    user.findOne(query, callback);
}

module.exports.addUser = (newUser, callback)=>{
    bcrypt.genSalt((err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err) throw err;            
            newUser.password = hash;
            newUser.save(callback);
        });
    })
}

module.exports.comparePassword = (initialPw, hash, callback)=>{
    bcrypt.compare(initialPw, hash, (err, isMatch)=>{
        if(err) throw err;
        callback(null, isMatch)

    })
}
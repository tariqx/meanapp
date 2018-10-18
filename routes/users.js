const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/mongodb')

const router = express.Router();
//const authMiddware = passport.authenticate('jwt', { session: false });
//router.use(authMiddware);

const User = require('../models/user')

passport.initialize();
require('../config/passport')(passport);

router.post('/register', (req, res, next)=>{
    //res.send('register');
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })

    User.addUser(newUser, (err, user)=>{
        if(err){
            res.json({
                success: false,
                msg: 'Failed to register user'
            })
        }
        else{
            res.json({
                success: true,
                msg: 'User registered'
            }) 
        }
    })
});


router.post('/authen', (req, res, next)=>{
   // res.send('authenticate');
   const username = req.body.username;
   const pw = req.body.password;

   User.getUserByUserName(username, (err, user)=>{
        if(err) throw err;

        if(!user){
            return res.json({
                success: false,
                msg: 'user not found'
            })
        }

        User.comparePassword(pw, user.password, (err, isMatch)=>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800, // 1 week in secs.
                });
                res.json({
                    success: true,
                    token: 'jwt ' + token,
                    user: {
                        id: user._id,
                        name: user.username,
                        email: user.email
                    }
                })
            }
            else{
                return res.json({
                    success: false,
                    msg: 'wrong password'
                })
            }
        });
   })

})

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next)=>{
    //res.send('profile');
    res.json({
        user: req.user
    })

})


module.exports = router;
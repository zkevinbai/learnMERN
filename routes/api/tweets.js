const express = require("express");
const router = express.Router();
const passport = require("passport");
const validateTweetinput = require("../../validation/tweets");
const Tweet = require("../../models/Tweet");
// const jwt = require('jsonwebtoken');

router.get("/test", (req, res) => res.json({
    msg: "This is the tweets route"
}));

// Get all tweets Route
////////////////////////////////////////////////////////////////////////////////
router.get("/", (req, res) => {
    Tweet
        .find()
        .sort({ date: -1 })
        .then(tweets => res.json(tweets))
        .catch(err => res.status(400).json(err));
});

// Get all tweets by a User
////////////////////////////////////////////////////////////////////////////////
router.get("/user/:user_id", (req, res) => {
    Tweet
        .find({ user: req.params.user_id })
        .then(tweets => res.json(tweets))
        .catch(err => res.status(400).json(err));
});

// Get tweet by a tweet id
////////////////////////////////////////////////////////////////////////////////
router.get("/:id", (req, res) => {
    Tweet
        .findById( req.params.id )
        .then(tweet => res.json(tweet))
        .catch(err => res.status(400).json(err));
});

// Create Tweet Route
////////////////////////////////////////////////////////////////////////////////
router.post("/", 
    passport.authenticate("jwt", {session: false}),
    (req, res) =>{
        const {isValid, errors} = validateTweetinput(req.body);
        
        if(!isValid){
            return res.status(400).json(errors);
        }

        const newTweet = new Tweet({
            user: req.user.id,
            text: req.body.text
        });

        newTweet.save()
            .then( tweet => res.json(tweet))
            .catch( errors => res.json(errors));
    }
);

module.exports = router;
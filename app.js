const express = require("express");
const app = express();
const mongoose = require('mongoose');

const db = require('./config/keys').mongoURI;

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");

const User = require("./models/User");

const bodyParser = require('body-parser'); // tells app what kinds of requests to respond to

const passport = require('passport');
require('./config/passport')(passport);

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ 
    extended: false 
}));

app.use(bodyParser.json());

// app.get("/", (req, res) => {
//     const user = new User({
//         handle: "kev",
//         email: "kev@kev.com",
//         password: "password"
//     });
//     res.send("Hello World");
// });

app.use("/api/users", users);
app.use("/api/tweets", tweets);
app.use(passport.initialize());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

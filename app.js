const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require("cors");
const express = require('express');
const app = express();

// parse app
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// fetch middleware
app.use(cors());

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

// db
const { models } = require('./models');

// routes
const { index } = require('./routes');
const { docs } = require('./routes/docs');
const { about } = require('./routes/about');
const { dragons } = require('./routes/dragons');

// auth
const { generateAccessToken, authenticateToken } = require('./helpers/auth');

index(app, models, generateAccessToken, jwt);
docs(app);
about(app);
dragons(app);

app.listen(process.env.PORT, () => {
    console.log(`Listening port ${process.env.PORT}`);
});
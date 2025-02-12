const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require("cors");
const path = require("path");
const validator = require('validator');
const bcrypt = require('bcrypt');

const express = require('express');
const app = express();

// parse app
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// fetch middleware
app.use(cors());

// serves static files to front-end
app.use(express.static(path.join(__dirname, '../frontend/build')));

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

// db
const { models } = require('./models');

// routes
const { index } = require('./routes');

// auth
const { generateAccessToken, authenticateToken } = require('./helpers/auth');

index(app, models, generateAccessToken, authenticateToken, jwt, path, validator, bcrypt);

app.listen(process.env.PORT, () => {
    console.log(`Listening port ${process.env.PORT}`);
});
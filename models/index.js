


// db config
const mongoose = require('mongoose');
const { dragon } = require('./Dragon');
const { user } = require('./User');

mongo().catch(err => console.log(err));

async function mongo() {
    await mongoose.connect(`${process.env.CONNECTION}`);
    console.log('Db connected!');
}

let jsonModels = {
    dragon : dragon(mongoose),
    user : user(mongoose)
};

exports.models = jsonModels;
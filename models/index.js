


// db config
const mongoose = require('mongoose');
const { dragon } = require('./Dragon');

mongo().catch(err => console.log(err));

async function mongo() {
    await mongoose.connect(`${process.env.CONNECTION}`);
    console.log('Db connected!');
}

let jsonModels = {
    dragon : dragon(mongoose)
};

exports.models = jsonModels;
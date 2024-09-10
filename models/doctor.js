//Schema for Doctor

const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({

    username : {
        type : String,
        unique : true,
        required : true
    },

    password : {
        type : String,
        required : true
    }

},{
    timestamps : true
});

const Doctor = mongoose.model('Doctor' , doctorSchema);

module.exports = Doctor;
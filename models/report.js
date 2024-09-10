// Schema for Report

const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    doctor: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;

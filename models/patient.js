// Schema for Patient

const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        unique: true,
        required: true
    },
    reports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Report'
    }]
}, {
    timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;

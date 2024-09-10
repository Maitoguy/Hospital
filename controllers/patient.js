const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const Report = require('../models/report');
const jwt = require('jsonwebtoken');

// Controller to Add Patient
module.exports.addPatient = async function(req , res){

    const {phoneNum} = req.body;

    if(phoneNum.length != 10){
        return res.status(400).send('Please Enter 10 digit number');
    }

    const regex = /^\d+$/;
    if(!regex.test(phoneNum)){
        return res.status(400).send('Please Enter only digit');
    }

    const patient = await Patient.findOne({phoneNumber: phoneNum});

    try{
        const newPatient = new Patient({
            phoneNumber : phoneNum
        });

        await newPatient.save();

       
        
    }catch(error){

        if(error.code == 11000){
            const { phoneNumber, reports } = patient;
            return res.status(200).send("Patient Already Exists and here are his details " + 
            "Phone Number " + phoneNum + 
            " Reports " + reports
            );
        }

        return res.status(404).send("This is error we are having while adding patient " + error);

    }

}

// Controller to Create and Add Report
module.exports.createReport = async function(req , res){

    const { status } = req.body;

    const phoneNumber = req.params.id;

    const patient = await Patient.findOne({phoneNumber : phoneNumber});

    if(!patient){
        return res.status(404).send("Patient is not Registered please register him");
    }

    let payload;
    const token = req.headers["authorization"];

    if(!token){
        return res.status(401).send("Unauthorized Access");
    }

    try{
        payload = jwt.verify(token , "Premachi Goshta");
        
    }catch(error){
        return res.status(401).send("Unauthorized Access");
    }

    try{
        const newReport = new Report({
            doctor : payload.userName,
            status : status,
            date : new Date()
        });

        await newReport.save();
        patient.reports.push(newReport);

        
        await patient.save();

        return res.status(200).send("Report Saved Successfully");
    }catch(error){

        console.error('Error Adding Doctor' , error);
        res.status(500).send('Error occured while adding Patient');

    }
   
}

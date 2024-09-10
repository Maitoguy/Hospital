const Doctor = require('../models/doctor');

const jwt = require('jsonwebtoken');


// Controller to Register Doctor
module.exports.addDoctor = async function(req , res){

    try{
        const {userName , password} = req.body;
        const newDoctor = new Doctor({
            username : userName,
            password : password
        });

        if(!userName || !password){
            res.status(400).send("Please send both userName and password");
        }

        await newDoctor.save();
        res.status(202).send("Doctor Added Successfully");

    }catch(error){

        if(error.code == 11000){
            return res.status(409).send('Username already taken. Please choose  different username');
        }
        
        console.error('Error Adding Doctor' , error);
        res.status(500).send('Error occured while adding doctor');

    }
    
}

// Controller to Log in Doctor
module.exports.doctorLogin  = async function(req , res){

    try{
        const {userName , password} = req.body;
        console.log(userName + " " + password);
        if(!userName || !password){
            return res.status(404).send('Please enter correct valid Credentials');
        }
        const doctor = await Doctor.findOne({ username: userName, password });
        if(!doctor){
            return res.status(404).send('Please Register yourself then login ');
        }
        
        const token = jwt.sign({userName : userName} , "Premachi Goshta");
        res.status(200).send("You have logged in successfully" + " & Token is : " + token);

    }catch(error){

        console.error('Error Adding Doctor' , error);
        res.status(500).send('Error occured while adding doctor');

    }
   
}



const express = require('express');
const router = express.Router();
const jwtAuth = require('../middleware/jwt');

const doctorController = require('../controllers/doctor');
const patientController = require('../controllers/patient');
const reportController = require('../controllers/report');


router.get('/' , (req , res) => {
    res.send("Hello World");
});



// Routes for Doctor

//To Register the Doctor
router.post('/doctors/register' ,  doctorController.addDoctor);

// To allow login for Doctor
router.post('/doctors/login' , doctorController.doctorLogin);


// Routes for Patients
//router.post('/dummy' , jwtAuth , doctorController.dummy);
router.post('/patients/register' , jwtAuth, patientController.addPatient);

router.post('/patient/:id/create-report', jwtAuth, patientController.createReport);


// Routes for Report
//Report for Specific Patient
router.get('/patient/:id/all-report' , jwtAuth , reportController.getReport);
// Report Based on the Status
router.get('/report/:status' , jwtAuth , reportController.getStatuswise);

module.exports = router;
const Report = require('../models/report');
const Patient = require('../models/patient');

// Controller to Get Report
module.exports.getReport =  async function(req , res){


    const phoneNumber = req.params.id;

    const patient = await Patient.findOne({phoneNumber : phoneNumber}).populate('reports');

    if(!patient){
        return res.status(404).send("Please Register the Patient")
    }

    const reportSummary = patient.reports.map(report => ({
        doctor: report.doctor,
        status: report.status,
        date: report.date
    }));

    res.status(200).json(reportSummary);

}

// Controller to get Report Statuswise
module.exports.getStatuswise = async function(req, res) {
    const { status } = req.params;

    try {
        const reports = await Report.find({ status: status });

        if (reports.length === 0) {
            return res.status(404).send("No reports found with the given status");
        }

        const filteredReports = reports.map(report => ({
            doctor: report.doctor,
            status: report.status,
            date: report.date
        }));

        res.status(200).json(filteredReports);

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};
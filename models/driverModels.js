const mongoose = require('mongoose');
const driverSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, "please enter user firstName !"]
    },
    lastName: {
        type: String,
        required: [true, "please enter user lastName !"]
    },
    motherName: {
        type: String,
        required: [true, "please enter user motherName  !"]
    },
    fatherName: {
        type: String,
        required: [true, "please enter user fatherName !"]
    },
    gender: {
        type: String,
        required: [true, "please enter gender !"]
    },
    phoneNumber: {
        type: String,
        required: [true, "please enter phoneNumber !"]
    },
    nationalNumber: {
        type: Number,
        required: [true, "please enter nationalNumber !"]
    },
    email: {
        type: String,
        required: [true, "please enter email !"]
    },
    password: {
        type: String,
        required: [true, "please enter password !"]
    },
    });
const Driver = mongoose.model('Driver',driverSchema);
module.exports = Driver;
const mongoose = require('mongoose');
const driverschema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, "please enter user firstName !"]
    },
    lastName: {
        type: String,
        required: [true, "please enter user lastName !"]
    },
    driverName: {
        type: String,
        required: [true, "please enter user driverName !"]
    },
    motherName: {
        type: String,
        required: [false, "please enter user motherName  !"]
    },
    fatherName: {
        type: String,
        required: [false, "please enter user fatherName !"]
    },
    gender: {
        type: String,
        required: [true, "please enter gender !"]
    },
    phoneNumber: {
        type: Number,
        required: [true, "please enter phoneNumer !"]
    },
    nationalNumber: {
        type: Number,
        required: [false, "please enter nationalNumber !"]
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
const Driver = mongoose.model('Driver',driverschema);
module.exports = Driver;
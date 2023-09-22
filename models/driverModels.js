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
    motherName: {
        type: String,
        required: [false, "please enter user motherName  !"]
    },
    fatherName: {
        type: String,
        required: [false, "please enter user fatherName !"]
    },
    email: {
        type: String,
        required: [true, "please enter email !"]
    },
    password: {
        type: String,
        required: [true, "please enter password !"]
    },
    gender: {
        type: String,
        required: [true, "please enter gender !"]
    },
    phoneNumber: {
        type: String,
        required: [true, "please enter phoneNumer !"]
    },
    nationalNumber: {
        type: Number,
        required: [false, "please enter nationalNumber !"]
    },

    });
const Driver = mongoose.model('Driver',driverschema);
module.exports = Driver;
const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [false, "please enter user firstName !"]
    },
    lastName: {
        type: String,
        required: [false, "please enter user lastName !"]
    },
    matherName: {
        type: String,
        required: [false, "please enter user matherName  !"]
    },
    fatherName: {
        type: String,
        required: [false, "please enter user fatherName !"]
    },
    email: {
        type: String,
        required: [false, "please enter email !"]
    },
    password: {
        type: String,
        required: [false, "please enter password !"]
    },
    gender: {
        type: String,
        required: [false, "please enter gender !"]
    },
    /*age: {
        type: Number,
        required: [true, "please enter age !"]
    },*/
    phoneNumber: {
        type: String,
        required: [false, "please enter phoneNumber !"]
    },
    /*location: {
        type: String,
        required: [true, "please enter location !"]
    },*/
    nationalNumber: {
        type: Number,
        required: [false, "please enter nationalNumber !"]
    },
    });
const Customer = mongoose.model('Customer',customerSchema);
module.exports = Customer;
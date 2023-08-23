const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, "please enter user firstName !"]
    },
    lastName: {
        type: String,
        required: [true, "please enter user lastName !"]
    },
    matherName: {
        type: String,
        required: [true, "please enter user matherName  !"]
    },
    fatherName: {
        type: String,
        required: [true, "please enter user fatherName !"]
    },
    userName: {
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
    /*age: {
        type: Number,
        required: [true, "please enter age !"]
    },*/
    phoneNumer: {
        type: Number,
        required: [true, "please enter phoneNumer !"]
    },
    /*location: {
        type: String,
        required: [true, "please enter location !"]
    },*/
    nationalNumber: {
        type: Number,
        required: [true, "please enter nationalNumber !"]
    },
    });
const Customer = mongoose.model('Customer',customerSchema);
module.exports = Customer;
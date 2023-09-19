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
   
    phoneNumber: {
        type: String,
        required: [false, "please enter phoneNumber !"]
    },
 
    nationalNumber: {
        type: Number,
        required: [false, "please enter nationalNumber !"]
    },


    });
const Customer = mongoose.model('Customer',customerSchema);
module.exports = Customer;
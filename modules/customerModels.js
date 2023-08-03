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
    age: {
        type: Number,
        required: [true, "please enter age !"]
    },
    phones: {
        type: Number,
        required: [true, "please enter phones !"]
    },
    location: {
        type: String,
        required: [true, "please enter location !"]
    },
    });
const Customer = mongoose.model('Customer',customerSchema);
module.exports = Customer;
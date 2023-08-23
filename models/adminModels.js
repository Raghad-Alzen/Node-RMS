const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, "please enter user firstName !"]
    },
    lastName: {
        type: String,
        required: [true, "please enter user lastName !"]
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

const Admin = mongoose.model('Admin',adminSchema);
module.exports = Admin;
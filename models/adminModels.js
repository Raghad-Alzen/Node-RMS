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
    gender: {
        type: Number,
        required: [true, "please enter gender !"]
    },
    phoneNumber: {
        type: Number,
        required: [true, "please enter phoneNumber !"]
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

const Admin = mongoose.model('Admin',adminSchema);
module.exports = Admin;
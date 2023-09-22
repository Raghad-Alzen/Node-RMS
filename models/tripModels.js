const mongoose = require('mongoose');
const tripSchema = new mongoose.Schema({

    tripName: {
        type: String,
        required: [false, "please enter user tripName !"]
    },
    startPoint: {
        type: String,
        required: [false, "please enter user startPoint !"]
    },
    endPoint: {
        type: String,
        required: [false, "please enter user endPoint !"]
    },
    tripPrice: {
        type: Number,
        required: [false, "please enter user tripPrice !"]
    },
    tripTime: {
        type: Date,
        required: [false, "please enter user tripTime !"]
    },
    StatusTrip: {
        type: String,
        required: [false, "please enter user StatusTrip !"],
        enum: ['effective', 'canceled', 'finished']
    },
    tripEndDate: {
        type: Date,
        required: [false, "please enter user tripEndDate !"],
    },
     driverName: {
        type: String,
        required: [false, "please enter driver!"],
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer",
        required: [false, "Please enter the customer ID"],
      },
    
    });
const Trip = mongoose.model('Trip',tripSchema);
module.exports = Trip;
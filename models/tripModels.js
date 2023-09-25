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
        required: [false, "please enter user fixedPrice !"]
    },
    tripTime: {
        type: String,
        required: [false, "please enter user tripTime !"]
    },
    StatusTrip: {
        type: String,
        required: [false, "please enter user StatusTrip !"],
        enum: ['effective', 'canceled', 'finished']
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
      driver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "driver",
        required: [false, "Please enter the driver ID"],
    }
    
    });
const Trip = mongoose.model('Trip',tripSchema);
module.exports = Trip;
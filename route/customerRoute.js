const express = require("express");
const router = express.Router();
const Customer = require ("../models/customerModels.js");
const Trip = require ("../models/tripModels.js");


router.post("/signupCustomer", async (request, response) => {
    try {
      const customer = await Customer.create(request.body);
      response.status(200).json(customer);
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  });

  router.put("/updateCustomer_info/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const customer = await Customer.findByIdAndUpdate(id, request.body);
      if(!customer)
      response
      .status(404)
      .json({ message: 'cannot find user with id ${id} !'});
    else {
      const newcustomer = await Customer.findById(id);
      response.status(200).json(newcustomer);
    }  
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message});
    }
  });



  router.get("/viewTripDescription/:tripName", async (request, response) => {
    try {
      const { tripName } = request.params;
      const trip = await Trip.findOne({ tripName });
      if (!trip) {
        return response.status(404).json({ message: "trip not found" });
      }
      response.status(200).json(trip);
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  });

  /*router.delete("/deleteReservation/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const 
    }
  })*/

  

  module.exports = router;

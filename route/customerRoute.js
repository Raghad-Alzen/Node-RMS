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


  router.get("/get_allCustomer", async (request, response) => {
    try {
      const customer = await Customer.find({}).select("email");
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
      const trip = await Trip.findOn({tripName});
      if(!tripName)
      response
      .status(404)
      .json({ message: 'tripName not found !'});
      else {
        const tripName = await Trip.findOn(tripName);
      }} catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message});}
  });

  module.exports = router;

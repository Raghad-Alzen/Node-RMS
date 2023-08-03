const express = require("express");
const router = express.Router();
const Customer = require ("../modules/customerModels.js");


router.post("/signupCustomer", async (request, response) => {
    try {
      const customer = await Customer.create(request.body);
      response.status(200).json(customer);
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  });
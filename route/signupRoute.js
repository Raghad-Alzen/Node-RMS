const express = require('express');
const router = express.Router();
const Customer = require ("../models/customerModels.js");
const Driver = require ("../models/driverModels.js");


router.post("/signup/:userType", async (request, response) => {
    try {
      let newUser;
      
      if (request.params.userType === "customer") {
        newUser = await Customer.create(request.body);
      } else if (request.params.userType === "driver") {
        newUser = await Driver.create(request.body);
      } else {
        response.status(400).json({ message: "Invalid user type" });
        return;
      }
      
      response.status(200).json(newUser);
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  });


  router.post("/signupCustomer", async (request, response) => {
    try {
      const customer = await Customer.create(request.body);
      response.status(200).json(customer);
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  });


  router.post("/signupDriver", async (request, response) => {
    try {
      const driver = await Driver.create(request.body);
      response.status(200).json(driver);
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  });
  


module.exports = router;
const express = require('express');
const router = express.Router(); 

const Customer = require ("../models/customerModels.js");
const Driver = require ("../models/driverModels.js");

router.post("/login", async (request, response) => {
    try {
        const { email, password } = request.body;
     
        const customer = await Customer.findOne({ email, password});
         if(customer) {
          return response.status(200).json({role: "customer", message: "customer login successful", id: customer._id, name: `${customer.firstName} ${customer.lastName}` });
        }

        const driver = await Driver.findOne({ email, password});
         if(driver) {
        return response.status(200).json({role: "driver", message: "driver login successful", id: driver._id, name: `${driver.firstName} ${driver.lastName}` });
       }

        return response.status(400).json({ error: "Invalid email or password" });
       } 
        catch (error) {
        console.log(error.message);
        response.status(500).json({ message: error.message });
       }

      });
module.exports = router;
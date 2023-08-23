const express = require('express');
const router = express.Router();
const Admin = require ("../models/adminModels.js");
const Customer = require ("../models/customerModels.js");
const Driver = require ("../models/driverModels.js");

router.post("/login", async (request, response) => {
    try {
        const { email, password } = request.body;
         

        /*const admin = await Admin.findOne({ email, password });
        if (admin) {
          return response.status(200).json({ role: "admin", message: "Admin login successful", id: admin._id, name: admin.firstName });
        }*/


        const customer = await Customer.findOne({ email, password});
         if(customer) {
          return response.status(200).json({role: "customer", message: "customer login successful", id: customer._id, name: customer.firstName });
        }

        const driver = await Driver.findOne({ email, password});
         if(driver) {
        return response.status(200).json({role: "driver", message: "driver login successful", id: driver._id, name: driver.firstName });
       }

        return response.status(400).json({ error: "Invalid email or password" });
       } 
        catch (error) {
        console.log(error.message);
        response.status(500).json({ message: error.message });
       }

      });
module.exports = router;
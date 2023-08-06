const express = require("express");
const router = express.Router();
const Admin = require ("../models/adminModels.js");
const Customer = require("../models/customerModels.js");
const Driver = require("../models/driverModels.js");


 /*router.get("/get_allCustomer", async (request, response) => {
    try {
      const admin = await Admin.find({}).select("id");
      response.status(200).json(customer);
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  });*/



  /*router.get("/get_allDriver", async (request, response) => {
    try {
      const admin = await Admin.find({}).select("id");
      response.status(200).json(driver);
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  });*/

  


  /*router.put("/updateAdmin_info/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const admin = await Admin.findByIdAndUpdate(id, request.body);
      if(!admin)
      response
      .status(404)
      .json({ message: 'cannot find admin with id ${id} !'});
    else {
      const newadmin= await Admin.findById(id);
      response.status(200).json(newadmin);
    }  
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message});
    }
    });*/














module.exports = router;
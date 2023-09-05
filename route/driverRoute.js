const express = require("express");
const router = express.Router();
const Driver = require ("../models/driverModels.js");
const Trip = require ("../models/tripModels.js");


// router.get("/get_allTrip", async (request, response) => {
//   try {
//     const trip = await Trip.find({});
//     response.status(200).json(trip);
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).json({ message: error.message });
//   }
// });


// router.get("/get_allDriver", async (request, response) => {
//   try {
//     const driver = await Driver.find({});
//     response.status(200).json(driver);
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).json({ message: error.message });
//   }
// });


// router.put("/updatedriver_info/:id", async (request, response) => {
//     try {
//       const { id } = request.params;
//       const driver = await Driver.findByIdAndUpdate(id, request.body);
//       if(!driver)
//       response
//       .status(404)
//       .json({ message: 'cannot find driver with id ${id} !'});
//     else {
//       const newcdriver = await Driver.findById(id);
//       response.status(200).json(newcdriver);
//     }  
//     } catch (error) {
//       console.log(error.message);
//       response.status(500).json({ message: error.message});
//     }
// });


router.get("/viewTripDescription/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await Trip.findById(id);
    if (trip) res.status(200).json(trip);
    else res.status(404).json({ message: "can't find trip" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});











module.exports = router;
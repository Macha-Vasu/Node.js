const express = require("express");
const router = express.Router();

const PatientController = require("../controllers/PatientController");
const User = require("../models/User");
const { auth, permit } = require("../middleware/auth");

router.post(
  "/",
  auth,
  permit("admin", "reception", "doctor", "nurse"),
  PatientController.createPatient
);

router.get(
  "/search",
  auth,
  permit("admin", "doctor", "nurse", "reception"),
  PatientController.searchPatients
);

router.get(
  "/:id",
  auth,
  permit("admin", "doctor", "nurse", "reception", "patient"),
  PatientController.getPatient
);

router.put(
  "/:id",
  auth,
  permit("admin", "doctor", "nurse"),
  PatientController.updatePatient
);

module.exports = router;

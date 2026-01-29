import express from "express";

const router = express.Router();

// Import route modules
import {AddDoctor,
    AddPatient,
    AddSlots,
    CancelPatientSlot,
    NoShowPatient} from "../controllers/AllControllers.js";

// Define routes
router.post("/add-doctor", AddDoctor);
router.post("/add-slot", AddSlots);
router.post("/add-patient", AddPatient);
router.post("/cancel-patient-slot", CancelPatientSlot);
router.post("/no-show-patient", NoShowPatient);

export default router;
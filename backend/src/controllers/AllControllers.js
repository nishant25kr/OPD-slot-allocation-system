import { HandlePatientArrival } from "../handler/HandlePatientArrival.js";
import { HandlePatientCancellation } from "../handler/HandlePatientCancellation.js";
import { HandleNoShow } from "../handler/HandleNoShow.js";
import { store, allocationEngine, printState } from "../index.js";

const VALID_PATIENT_TYPES = ["priority", "followup", "normal"];

export const AddDoctor = (req, res) => {
    const { id, name } = req.body;

    if (!id || !name) {
        return res.status(400).json({ success: false, error: "Doctor id and name are required" });
    }

    if (store.doctors.has(id)) {
        return res.status(409).json({ success: false, error: "Doctor already exists" });
    }

    store.doctors.set(id, { id, name });

    printState(store, `After adding Doctor ${id}`);

    return res.status(201).json({
        success: true,
        message: "Doctor added successfully",
        data: { id, name }
    });
};

export const AddSlots = (req, res) => {
    const { id, doctorId, start, end, maxCapacity } = req.body;

    if (!id || !doctorId || !start || !end || !maxCapacity) {
        return res.status(400).json({ success: false, error: "All slot details are required" });
    }

    if (!store.doctors.has(doctorId)) {
        return res.status(404).json({ success: false, error: "Doctor does not exist" });
    }

    if (store.slots.has(id)) {
        return res.status(409).json({ success: false, error: "Slot already exists" });
    }

    store.slots.set(id, {
        id,
        doctorId,
        start,
        end,
        maxCapacity,
        assignedPatients: []
    });

    printState(store, `After adding Slot ${id}`);

    return res.status(201).json({
        success: true,
        message: "Slot added successfully",
        data: { id, doctorId, start, end }
    });
};

export const AddPatient = (req, res) => {
    const { id, name, type } = req.body;

    if (!id || !name || !type) {
        return res.status(400).json({ success: false, error: "Patient id, name and type are required" });
    }

    if (!VALID_PATIENT_TYPES.includes(type)) {
        return res.status(400).json({ success: false, error: "Invalid patient type" });
    }

    if (store.patients?.has(id)) {
        return res.status(409).json({ success: false, error: "Patient already exists" });
    }

    const patient = { id, name, type };
    store.patients?.set(id, patient);

    HandlePatientArrival(store, allocationEngine, patient);

    printState(store, `After adding Patient ${id}`);    

    return res.status(201).json({
        success: true,
        message: "Patient added successfully",
        data: patient
    });
};

export const CancelPatientSlot = (req, res) => {
    const { patientId } = req.body;

    if (!patientId) {
        return res.status(400).json({ success: false, error: "Patient id is required" });
    }

    HandlePatientCancellation(store, allocationEngine, patientId);

    printState(store, `After cancelling Patient ${patientId}`);

    return res.status(200).json({
        success: true,
        message: "Patient cancellation processed"
    });
};

export const NoShowPatient = (req, res) => {
    const { patientId } = req.body;

    if (!patientId) {
        return res.status(400).json({ success: false, error: "Patient id is required" });
    }

    HandleNoShow(store, allocationEngine, patientId);

    printState(store, `After marking No-Show for Patient ${patientId}`);

    return res.status(200).json({
        success: true,
        message: "Patient marked as no-show"
    });
};

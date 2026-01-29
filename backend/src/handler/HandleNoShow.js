export const HandleNoShow = (store, allocationEngine, patientId) => {
    const patient = store.getPatientByid(patientId);
    if (!patient) {
        console.error(`Patient with ID ${patientId} not found.`);
        return;
    }

    // Mark the patient as a no-show in the store
    store.markPatientAsNoShow(patientId);

    // Update the allocation engine to free up any resources allocated to this patient
    allocationEngine.handleNoShow(patientId);
}
export const HandlePatientArrival = (store, allocationEngine, patient) => {
    
    // Enqueue the patient based on their type
    if (patient.type === 'priority') {
        store.queue.priority.push(patient);
    } else if (patient.type === 'followup') {
        store.queue.followup.push(patient);
    } else {
        store.queue.regular.push(patient);
    }

    // Attempt to allocate a slot to the arriving patient
      allocationEngine.process();


};

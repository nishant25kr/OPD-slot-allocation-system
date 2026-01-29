

export const HandlePatientArrival = (store, allocationEngine, patient) => {

    if (patient.type === 'priority') {
        store.queue.priority.push(patient);
    } else if (patient.type === 'followup') {
        store.queue.followup.push(patient);
    } else {
        store.queue.regular.push(patient);
    }

    allocationEngine.process();

};

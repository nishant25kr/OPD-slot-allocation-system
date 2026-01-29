

export const HandlePatientCancellation = (store, allocationEngine, patientId) => {

    //here we are checking if the patient is already assigned to a slot if so we remove
    //them frm the slot else we can remove them from the queue
    
    let cancelled = false;

    for (const slot of store.slots.values()) {
        const index = slot.assignedPatients.findIndex(p => p.id === patientId);
        if (index !== -1) {
            slot.assignedPatients.splice(index, 1);
            cancelled = true;
            break;
        }
    }

    if (!cancelled) {
        const removeFromQueue = (queue) => {
            const index = queue.findIndex(p => p.id === patientId);
            if (index !== -1) {
                queue.splice(index, 1);
                return true;
            }
            return false;
        };

        if (!removeFromQueue(store.queue.priority)) {
            if (!removeFromQueue(store.queue.followup)) {
                removeFromQueue(store.queue.regular);
            }
        }
    }

    allocationEngine.process();
};

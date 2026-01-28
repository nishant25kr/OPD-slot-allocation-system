export class AllocationEngine {
  constructor(store) {
    this.store = store;
  }

  process() {
    while (true) {
      const patient = this.getNextPatient();
      if (!patient) break;

      const slot = this.getNextAvailableSlot();
      if (!slot) {
        // Put patient back if no slot is available
        this.requeuePatient(patient);
        break;
      }
      console.log(`Allocating Patient ${patient.name} to Slot ${slot.id}`);

      slot.assignedPatients.push(patient);
      patient.status = "ASSIGNED";
    }
  }

  getNextPatient() {
    if (this.store.queue.priority.length > 0) {
      return this.store.queue.priority.shift();
    }
    if (this.store.queue.followup.length > 0) {
      return this.store.queue.followup.shift();
    }
    if (this.store.queue.regular.length > 0) {
      return this.store.queue.regular.shift();
    }
    return null;
  }

  getNextAvailableSlot() {
    for (const slot of this.store.slots.values()) {
      if (slot.assignedPatients.length < slot.maxCapacity) {
        return slot;
      }
    }
    return null;
  }

  requeuePatient(patient) {
    if (patient.type === "priority") {
      this.store.queue.priority.unshift(patient);
    } else if (patient.type === "followup") {
      this.store.queue.followup.unshift(patient);
    } else {
      this.store.queue.regular.unshift(patient);
    }
  }
}

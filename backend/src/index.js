import { Store } from "./store/InMemoryStore.js";
import { AllocationEngine } from "./engine/AllocationEngine.js";
import { HandlePatientArrival } from "./handler/handlePatientArrival.js";


// Initialize the in-memory store
const store = new Store();
const allocationEngine = new AllocationEngine(store);


//print the state of the memotyStorage
const printState = (store, label) => {
  console.log("\n==============================");
  console.log(label);
  console.log("==============================");

  console.log("\nQueues:");
  console.log("Priority:", store.queue.priority.map(p => p.id));
  console.log("FollowUp:", store.queue.followup.map(p => p.id));
  console.log("Normal:", store.queue.regular.map(p => p.id));

  console.log("\nSlots:");
  for (const slot of store.slots.values()) {
    console.log(
      `Slot ${slot.id} (${slot.start}-${slot.end}) →`,
      slot.assignedPatients.map(p => p.id),
      `(free: ${slot.maxCapacity - slot.assignedPatients.length})`
    );
  }
};


//adding some slot in the memory store
store.doctors.set(
  "doc1",
  {
    id: "doc1",
    name: "Dr. Smith",
  }
)

store.doctors.set(
  "doc2",
  {
    id: "doc2",
    name: "Dr. Jones",
  }
)

store.slots.set(
  "slot1",
  {
    id: "slot1",
    doctorId: "doc1",
    start: "10:00",
    end: "10:30",
    maxCapacity: 2,
    assignedPatients: []
  }
)

store.slots.set(
  "slot2",
  {
    id: "slot2",
    doctorId: "doc2",
    start: "10:30",
    end: "11:00",
    maxCapacity: 1,
    assignedPatients: []
  }
)

// printState(store, "INITIAL STATE");

const patient1 = {
  id: "P1",
  type: "normal",
  name: "Alice Smith"
};
HandlePatientArrival(store, allocationEngine, patient1);


const patient2 = {
  id: "P2",
  type: "priority",
  name: "John Doe"
};
HandlePatientArrival(store, allocationEngine, patient2);


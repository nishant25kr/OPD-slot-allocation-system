import express from "express";
import { Store } from "./store/InMemoryStore.js";
import { AllocationEngine } from "./engine/AllocationEngine.js";
import { HandlePatientArrival } from "./handler/HandlePatientArrival.js";
import { HandlePatientCancellation } from "./handler/HandlePatientCancellation.js";
import { HandleNoShow } from "./handler/HandleNoShow.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize the in-memory store
const store = new Store();
const allocationEngine = new AllocationEngine(store);


// Middleware to parse JSON requests
app.use(express.json());

// Import routes
import AllRoutes from "./routes/AllRoutes.js";
app.use("/api", AllRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the Appointment Scheduling System API");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




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
  console.log("\nSlots:");
  for(const doctors of store.doctors.values()){
    console.log(`Doctor ${doctors.id} → Name: ${doctors.name}`);
  }
  console.log("==============================\n");

};




























// //adding some slot in the memory store
// store.doctors.set(
//   "doc1",
//   {
//     id: "doc1",
//     name: "Dr. Smith",
//   }
// )

// store.doctors.set(
//   "doc2",
//   {
//     id: "doc2",
//     name: "Dr. Jones",
//   }
// )

// store.slots.set(
//   "slot1",
//   {
//     id: "slot1",
//     doctorId: "doc1",
//     start: "9:00",
//     end: "10:00",
//     maxCapacity: 2,
//     assignedPatients: []
//   }
// )

// store.slots.set(
//   "slot2",
//   {
//     id: "slot2",
//     doctorId: "doc2",
//     start: "10:00",
//     end: "11:00",
//     maxCapacity: 2,
//     assignedPatients: []
//   }
// )

// printState(store, "INITIAL STATE");

// const patient1 = {
//   id: "P1",
//   type: "normal",
//   name: "Alice Smith"
// };
// HandlePatientArrival(store, allocationEngine, patient1);
// printState(store, "AFTER ARRIVAL OF PATIENT 1");


// const patient2 = {
//   id: "P2",
//   type: "priority",
//   name: "John Doe"
// };
// HandlePatientArrival(store, allocationEngine, patient2);
// printState(store, "AFTER ARRIVAL OF PATIENT 2");

// const patient3 = {
//   id: "P3",
//   type: "followup",
//   name: "Bob Johnson"
// };
// HandlePatientArrival(store, allocationEngine, patient3);
// printState(store, "AFTER ARRIVAL OF PATIENT 3");

// const patient4 = {
//   id: "P4",
//   type: "priority",
//   name: "Eve Davis"
// };
// HandlePatientArrival(store, allocationEngine, patient4);
// printState(store, "AFTER ARRIVAL OF PATIENT 4");

// const patient5 = {
//   id: "P5",
//   type: "normal",
//   name: "Charlie Brown"
// };
// HandlePatientArrival(store, allocationEngine, patient5);
// printState(store, "AFTER ARRIVAL OF PATIENT 5");  

// const patient6 = {
//   id: "P6",
//   type: "followup",
//   name: "Diana Prince"
// };
// HandlePatientArrival(store, allocationEngine, patient6);
// printState(store, "AFTER ARRIVAL OF PATIENT 6");

// const patient7 = {
//   id: "P7",
//   type: "priority",
//   name: "Frank Castle"
// };
// HandlePatientArrival(store, allocationEngine, patient7);
// printState(store, "AFTER ARRIVAL OF PATIENT 7");

// HandlePatientCancellation(store, allocationEngine, "P2");
// printState(store, "AFTER CANCELLATION OF PATIENT 2");

// HandleNoShow(store, allocationEngine, "P4");
// printState(store, "AFTER NO-SHOW OF PATIENT 4");

export { store, allocationEngine, printState };

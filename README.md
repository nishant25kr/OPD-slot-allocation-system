# 🏥 OPD Token Allocation System

## Overview
Event-driven hospital OPD system that allocates patients to doctor slots based on priority, capacity, and real-time events (cancellations, no-shows).

**Tech Stack**: Node.js, Express, JavaScript, In-Memory Store

---

## Core Features
✅ Priority-based allocation (Priority → Follow-up → Normal)  
✅ Dynamic slot management with capacity constraints  
✅ Real-time cancellation & no-show handling  
✅ Automatic waiting list promotion  
✅ Event-driven architecture (no polling/workers)

---

## Architecture
```
API → Event Handlers → Allocation Engine → In-Memory Store
```

### Key Components
1. **InMemoryStore**: Holds doctors, slots, patients, queues(regular, follow-up, priority)
2. **AllocationEngine**: Core logic for priority-based slot assignment
3. **Event Handlers**: `PatientArrival`, `Cancellation`, `NoShow`

### Design Decisions
- Event-driven: APIs trigger handlers → state updates → allocation runs
- Deterministic allocation: Earliest slot + highest priority patient
- No background jobs: Synchronous event processing
- In-memory storage: Focus on logic, easy to extend to DB

---

## API Endpoints
```http
POST /add-doctor              # Add doctor
POST /add-slot                # Add time slot with capacity
POST /add-patient             # Patient arrives (normal/followup/priority)
POST /cancel-patient-slot     # Cancel appointment → reallocate
POST /no-show-patient         # Mark no-show → reallocate
```

**Sample Request**:
```json
POST /patients/arrival
{
  "id": "P1",
  "name": "Alice",
  "type": "priority"  // priority | followup | normal
}
```

---

## Allocation Logic

1. Patient arrives → added to priority queue
2. Engine selects highest-priority waiting patient
3. Assigns to earliest available slot with capacity
4. Cancellation/no-show → frees slot → promotes next patient
5. Repeats until no valid allocation possible

**Priority Order**: `priority > followup > normal`

---

## Technical Highlights

**Why Event-Driven?**
- Clear separation of concerns
- Easy to test and extend
- No race conditions (synchronous)

**Why In-Memory?**
- Demonstrates pure allocation logic
- Deterministic testing
- Production-ready with DB swap (no logic changes)

---

## Code Quality

✅ Clean architecture (handlers, engine, store separated)  
✅ Single responsibility principle  
✅ Easy to extend (add new patient types, rules)  
✅ No premature optimization  
✅ Production-ready structure

---

## Assumptions
- Slots filled chronologically
- No doctor-specific preferences (generic OPD)
- No preemption (priority waits if full)
- Single-instance deployment

---

## Future Enhancements
- Persistent storage (PostgreSQL/Redis)
- Doctor-specific queues
- Emergency preemption
- Multi-instance support
- Real-time notifications

---

**Key Differentiators**:
- Clean event-driven design over CRUD APIs
- Deterministic allocation algorithm
- Real-world event handling (cancellations, no-shows)
- Extensible architecture with clear separation of concerns
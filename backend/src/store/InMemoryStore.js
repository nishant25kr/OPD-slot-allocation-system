export class Store {
    constructor() {
        this.doctors = new Map();
        this.slots = new Map();

        this.queue = {
            priority: [],
            followup: [],
            regular: []
        };

        this.config = {
            onlineBookingLimit: 5
        }

    }
    getPatientByid(patientId){
        for(const slot of this.slots.values()){
            const patient = slot.assignedPatients.find(p => p.id === patientId);
            if(patient){
                return patient;
            }
        }
        for(const patient of [...this.queue.priority, ...this.queue.followup, ...this.queue.regular]){
            if(patient.id === patientId){
                return patient;
            }
        }
        return null;
    }
    markPatientAsNoShow(patientId) {
        const patient = this.getPatientByid(patientId);
        if (patient) {
            patient.status = "NO_SHOW";
        }
    }
}
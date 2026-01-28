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
}
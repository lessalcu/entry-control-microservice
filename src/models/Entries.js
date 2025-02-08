class Entries {
    constructor(reservation_id, vehicle_id, user_id, parking_lot_id, entry_time, status) {
        this.reservation_id = reservation_id;
        this.vehicle_id = vehicle_id;
        this.user_id = user_id;
        this.parking_lot_id = parking_lot_id;
        this.entry_time = entry_time;
        this.status = status;
    }
}

module.exports = Entries;
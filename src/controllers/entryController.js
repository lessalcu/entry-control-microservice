const { getReservationById } = require('../services/reservationService');
const { getUserById } = require('../services/userService');
const { getVehicleById } = require('../services/vehicleService');
const db = require('../config/db');

const registerEntry = async (req, res) => {
    const { reservationId } = req.body;

    try {
        const [existingEntry] = await db.execute(
            'SELECT * FROM Entries WHERE reservation_id = ? AND status = ?',
            [reservationId, 'Entered']
        );
        if (existingEntry.length > 0) {
            return res.status(400).json({ message: 'Entry already registered for this reservation' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Database error while checking existing entry', error });
    }

    getReservationById(reservationId, async (err, reservation) => {
        console.log("🔍 Reservation response:", reservation);
        if (err || !reservation || reservation.status !== 'Confirmed') {
            return res.status(404).json({ message: 'Valid reservation not found' });
        }
        console.log("🔍 Extracted user_id:", reservation.userId);
        getUserById(reservation.userId, async (err, user) => {
            if (err || !user) {
                return res.status(404).json({ message: 'User not found' });
            }
            console.log("🔍 Extracted vehicle_id:", reservation.vehicleId);
            getVehicleById(reservation.vehicleId, async (err, vehicle) => {
                if (err || !vehicle) {
                    return res.status(404).json({ message: 'Vehicle not found' });
                }
                const entryTime = new Date();
                try {
                    const [result] = await db.execute(
                        'INSERT INTO Entries (reservation_id, vehicle_id, user_id, parking_lot_id, entry_time, status) VALUES (?, ?, ?, ?, ?, ?)',
                        [reservation.id, vehicle.id, user.id, reservation.parkingLotId, entryTime, 'Entered']
                    );
                    res.status(201).json({ message: 'Entry registered successfully', entryId: result.insertId });
                } catch (err) {
                    res.status(500).json({ message: 'Database error', error: err });
                }
            });
        });
    });
};

module.exports = { registerEntry };

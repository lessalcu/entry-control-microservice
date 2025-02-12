const requests = require('requests');
require('dotenv').config();

const RESERVATION_SERVICE_URL = process.env.RESERVATION_SERVICE_URL;
console.log(`✅ RESERVATION_SERVICE_URL: ${RESERVATION_SERVICE_URL}`);

const getReservationById = (reservationId, callback) => {
    // ✅ Modified the query to remove variable usage
    const query = `{ getReservationById(id: ${reservationId}) { id userId vehicleId parkingLotId startDate endDate status totalAmount } }`;

    const requestBody = JSON.stringify({ query });

    console.log(`📤 Sending request to ${RESERVATION_SERVICE_URL}`);
    console.log(`📝 Request Body:`, requestBody);

    let responseData = '';

    requests(RESERVATION_SERVICE_URL, {
        method: 'POST',
        body: requestBody,
        headers: { 'Content-Type': 'application/json' }
    })
        .on('data', (chunk) => {
            responseData += chunk;
        })
        .on('end', () => {
            try {
                console.log("📥 Raw response from ReservationService:", responseData);
                const result = JSON.parse(responseData);
                if (!result.data || !result.data.getReservationById) {
                    console.log("⚠️ Reservation not found in response");
                    return callback(null, null);
                }
                const reservation = result.data.getReservationById;
                console.log("✅ Extracted reservation data:", reservation);
                callback(null, reservation);
            } catch (error) {
                console.error("❌ Error parsing JSON response:", error);
                callback(error, null);
            }
        })
        .on('error', (error) => {
            console.error("❌ Error in reservation request:", error);
            callback(error, null);
        });
};

module.exports = { getReservationById };

const requests = require('requests');
require('dotenv').config();

const VEHICLE_SERVICE_URL = process.env.VEHICLE_SERVICE_URL;

const getVehicleById = (vehicleId, callback) => {
    const url = `${VEHICLE_SERVICE_URL}/${vehicleId}`;

    let responseData = '';

    console.log(`🔍 Fetching vehicle from: ${url}`);

    requests(url)
        .on('data', (chunk) => {
            responseData += chunk;
        })
        .on('end', () => {
            try {
                console.log("📥 Raw response from VehicleService:", responseData);
                const data = JSON.parse(responseData);
                if (!data || !data.id) {
                    console.log("⚠️ Vehicle not found in response");
                    return callback(null, null);
                }
                console.log("✅ Extracted vehicle data:", data);
                callback(null, data);
            } catch (error) {
                console.error("❌ Error parsing JSON response:", error);
                callback(error, null);
            }
        })
        .on('error', (error) => {
            console.error("❌ Error in vehicle request:", error);
            callback(error, null);
        });
};

module.exports = { getVehicleById };
const requests = require('requests');
require('dotenv').config();

const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

const getUserById = (userId, callback) => {
    const url = `${USER_SERVICE_URL}/users/${userId}`;

    let responseData = '';

    console.log(`🔍 Fetching user from: ${url}`);

    requests(url)
        .on('data', (chunk) => {
            responseData += chunk;
        })
        .on('end', () => {
            try {
                console.log("📥 Raw response from UserService:", responseData);
                const data = JSON.parse(responseData);
                if (!data || !data.id) {
                    console.log("⚠️ User not found in response");
                    return callback(null, null);
                }
                const user = {
                    id: data.id,
                    name: data.name,
                    email: data.email
                };
                console.log("✅ Extracted user data:", user);
                callback(null, user);
            } catch (error) {
                console.error("❌ Error parsing JSON response:", error);
                callback(error, null);
            }
        })
        .on('error', (error) => {
            console.error("❌ Error in user request:", error);
            callback(error, null);
        });
};

module.exports = { getUserById };
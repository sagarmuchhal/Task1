const mongoose = require('mongoose');

function dbConnection() {
    try {
        mongoose.connect(`mongodb://127.0.0.1:27017/sagar`);
        console.log('Connected to MongoDB');
        return mongoose.connection;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = { dbConnection };
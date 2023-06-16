const mongoose = require('mongoose');

const dbURL = process.env.DB_URL
const dbName = process.env.DB_NAME

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName
};

async function connectDB() {
    try {
        await mongoose.connect(dbURL, options);
        console.log('Connected to the database');
    } catch (error) {
        next(error)
    }
}

module.exports = connectDB;

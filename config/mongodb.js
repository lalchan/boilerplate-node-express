import mongoose from "mongoose";

export default function connectDB() {
    try {
        const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';

        mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    } catch (err) {
        console.error("Cannot connect to database", err);
        console.log("Retrying to connect to database...");
        setTimeout(() => connectDB(), 5000);
    }
}
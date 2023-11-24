import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connection successful.');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
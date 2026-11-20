import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // give up after 5s instead of waiting 30s
    });
    console.log(
      `MongoDB connected: ${conn.connection.host} (database: ${conn.connection.name})`
    );
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1); // stop the server: running without a database is pointless
  }
};

export default connectDB;
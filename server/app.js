import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

// ---------- Middleware ----------
// Allow requests only from our React frontend
app.use(cors({ origin: process.env.CLIENT_URL }));

// Parse JSON request bodies
app.use(express.json());

// ---------- Routes ----------
// Mongoose connection states, indexed by mongoose.connection.readyState
const dbStates = ['disconnected', 'connected', 'connecting', 'disconnecting'];

// Health check: confirms the API and database are up
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'CodeFolio API is running',
    database: dbStates[mongoose.connection.readyState],
  });
});

// ---------- 404 handler ----------
// Runs only if no route above matched
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

export default app;
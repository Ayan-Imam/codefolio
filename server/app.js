import 'dotenv/config';
import connectDB from './config/db.js';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import { getUserByUsername } from './controllers/user.controller.js';
import errorHandler from './middleware/error.middleware.js';
import contactRoutes from "./routes/contact.routes.js";

if (!/^[a-f0-9]{64}$/i.test(process.env.JWT_SECRET ?? '')) {
  throw new Error('Set JWT_SECRET to the generated 64-character hex value');
}

await connectDB();

const app = express();

// ---------- Middleware ----------
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

// ---------- Routes ----------
const dbStates = ['disconnected', 'connected', 'connecting', 'disconnecting'];

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'CodeFolio API is running',
    database: dbStates[mongoose.connection.readyState],
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use("/api/contact", contactRoutes);
app.use('/api/uploads', uploadRoutes);

// Public portfolio URL, for example /neon_user.
app.get('/:username', getUserByUsername);

// ---------- 404 handler ----------
app.use((req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ---------- Error handler ----------
app.use(errorHandler);

export default app;
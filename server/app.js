import express from 'express';
import cors from 'cors';

const app = express();

// ---------- Middleware ----------
// Allow requests only from our React frontend
app.use(cors({ origin: process.env.CLIENT_URL }));

// Parse JSON request bodies
app.use(express.json());

// ---------- Routes ----------
// Health check: confirms the API is up
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CodeFolio API is running' });
});

// ---------- 404 handler ----------
// Runs only if no route above matched
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

export default app;
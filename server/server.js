// IMPORTANT: this must stay the FIRST import so .env is loaded
// before any other file reads process.env
import 'dotenv/config';

import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // 1. Connect to the database first
  await connectDB();

  // 2. Only then start accepting requests
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`CORS allowed origin: ${process.env.CLIENT_URL}`);
  });
};

startServer();
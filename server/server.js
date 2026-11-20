// IMPORTANT: this must stay the FIRST import so .env is loaded
// before any other file reads process.env
import 'dotenv/config';

import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`CORS allowed origin: ${process.env.CLIENT_URL}`);
});
# CodeFolio

CodeFolio is a portfolio builder for developers. Create an account, add your work, choose a template, and share your portfolio at a username-based URL. You can change the template later without changing the link.

## Showcase profiles

| Username | Template | Public route |
| --- | --- | --- |
| `demo1` | Minimalist | `/user/demo1` |
| `demo2` | Cyberpunk | `/user/demo2` |

The shorter routes `/demo1` and `/demo2` also work. Deployment is pending. To view the demos locally, start the app and open `http://localhost:5173/user/demo1` or `http://localhost:5173/user/demo2`.

## Features

- Create and edit saved portfolios in a dashboard with a live preview.
- Add a profile photo, skills, projects, screenshots, certificates, and an education and experience timeline.
- Choose from Minimalist, Cyberpunk, and Editorial templates.
- Display a Pro badge on portfolios owned by a Pro account.
- Receive contact form messages at the portfolio’s saved email address. Clicking Reply addresses the visitor who submitted the form.

## Tech stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, Vite, React Router, React Hook Form, Tailwind CSS, React Helmet Async |
| Backend | Node.js, Express, MongoDB, Mongoose |
| Authentication | JWT, bcrypt |
| Media and email | Cloudinary, Nodemailer |

## Project structure

| Path | Purpose |
| --- | --- |
| `client/src/pages/dashboard/` | Portfolio editor |
| `client/src/pages/public/` | Landing page and public portfolios |
| `client/src/templates/` | Portfolio layouts |
| `server/` | API routes, controllers, middleware, and database models |
| [SYSTEM_DESIGN.md](SYSTEM_DESIGN.md) | How username routing and template selection work |

## Run locally

Install Node.js and npm and have a MongoDB connection available. Start the backend and frontend in separate terminals from the repository root.

### Backend

```powershell
cd server
npm install
```

For a fresh checkout, copy `.env.example` to `.env`. Set `PORT=5000`, `CLIENT_URL=http://localhost:5173`, and `MONGODB_URI` to your database connection string. Configure the server’s JWT secret, Cloudinary credentials, and SMTP settings for authentication, uploads, and contact messages.

Run `npm run dev`. Open `http://localhost:5000/api/health` and confirm that the database shows `connected`.

### Frontend

```powershell
cd client
npm install
```

Set `VITE_API_URL=http://localhost:5000/api` in `client/.env`. Run `npm run dev` and open `http://localhost:5173`.

For a fresh database, create the two showcase profiles through the dashboard using the usernames and templates listed above.

## Production

Set `VITE_API_URL` to the deployed API URL including `/api` before running `npm run build` in `client/`. Publish `client/dist/` and configure the frontend host to serve `index.html` for direct visits to portfolio routes.

Run `npm start` in `server/` with the production database connection and the deployed frontend origin in `CLIENT_URL`. Verify both demo links and email delivery on the live site.
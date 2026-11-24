# CodeFolio

CodeFolio is a portfolio builder for developers. Create a profile, add projects and skills, choose a template, and share your portfolio through a public username-based URL.

## Live demo

[Open CodeFolio](https://codefolio-web-nu.vercel.app)

| Showcase profile | Template |
| --- | --- |
| [Demo 1](https://codefolio-web-nu.vercel.app/user/demo1) | Minimalist |
| [Demo 2](https://codefolio-web-nu.vercel.app/user/demo2) | Cyberpunk |

## Features

- Create and manage portfolios from a dashboard with a live preview.
- Choose from three templates — Minimalist, Cyberpunk, and Editorial.
- Add projects, skills, certificates, and an education and experience timeline.
- Upload a profile photo and share social links.
- Receive visitor messages at the email address configured for your portfolio.

## Tech stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, Vite, React Router, React Hook Form, Tailwind CSS |
| Backend | Node.js, Express, Mongoose, JWT, bcrypt |
| Database and services | MongoDB Atlas, Cloudinary, Nodemailer with Gmail SMTP |
| Deployment | Vercel for the frontend and API |

## Project structure

```text
client/            React frontend, portfolio dashboard, and public pages
server/            Express API, database models, and email integration
SYSTEM_DESIGN.md   Design note on username-based portfolio routing
```

## Routing and deployment

Each showcase link opens a portfolio by username. The portfolio’s saved `templateId` determines how it appears. See the [system design note](./SYSTEM_DESIGN.md) for details.

The [API health endpoint](https://codefolio-api.vercel.app/api/health) reports the API status and MongoDB connection state.
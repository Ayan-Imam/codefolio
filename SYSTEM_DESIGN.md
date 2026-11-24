# CodeFolio System Design

CodeFolio is a portfolio builder with a React frontend, an Express API, and a MongoDB database. Each portfolio has a unique username for its public URL and a `templateId` that controls its layout.

## How username routing works

1. A visitor opens `/hello`. React Router matches `/:username` and renders `PublicPortfolioPage`. Static routes such as `/dashboard` take priority over the dynamic username route.
2. `PublicPortfolioPage` reads `hello` with `useParams()` and requests `GET /api/users/hello`. It displays a loading state while the request is in progress.
3. Express reads `req.params.username`, converts it to lowercase, and looks up the portfolio in MongoDB. The API returns the public portfolio data and omits the owner's private contact email and account ID. If the username does not exist, the API returns HTTP 404 and the frontend displays "Portfolio not found".
4. `PortfolioRenderer` reads `templateId` and renders the profile using the selected template. The owner can switch between Minimalist, Cyberpunk, and Editorial while keeping the same public URL.

## Dashboard and contact form

The dashboard uses authenticated API routes so owners can create and edit their portfolios. Visitors can view a public portfolio and submit its contact form without signing in.

The form sends a POST request to `/api/contact/:username`. The server finds the portfolio owner's contact email in MongoDB and sends the message through Nodemailer. The visitor's email becomes the reply address.

## Showcase profiles and deployment

With the current `/:username` route, portfolios saved as `demo1` and `demo2` have the public paths `/demo1` and `/demo2`. Assigning them different `templateId` values showcases two layouts through the same routing logic.

The frontend host needs to serve `index.html` when a visitor opens or refreshes a portfolio URL directly. React Router can then read the username and load the matching portfolio.

The /user/:username route also renders PublicPortfolioPage, so the showcase links /user/demo1 and /user/demo2 use the same lookup.

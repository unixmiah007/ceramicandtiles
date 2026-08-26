# Portillo Ceramic and Tile

A full-stack TypeScript website for Portillo Ceramic and Tile — family-owned tile and ceramic craftsmanship serving Northern Virginia and Washington, D.C.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, React Router
- **Backend:** Express, TypeScript, Helmet, CORS

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, process overview, services preview, values |
| `/experience` | Portfolio — Capitals, Pentagon, Orangetheory projects |
| `/services` | Full list of tile and ceramic services |
| `/why-portillo` | Company values and differentiators |
| `/contact` | Quote request form and contact information |

## Getting Started

### Prerequisites

- Node.js 18+

### Install

```bash
npm install
```

### Development

Runs both the Express API (port 3001) and Vite dev server (port 5173):

1. Copy the email environment file and add Gmail credentials:

```bash
cp server/.env.example server/.env
```

2. In `server/.env`, set `SMTP_PASS` to a [Gmail App Password](https://support.google.com/accounts/answer/185833) for `PortilloCeramicTile@gmail.com`.

3. Start the app:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm start
```

The Express server serves the built React app and API on port 3001.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/services` | List of services |
| GET | `/api/projects` | Portfolio projects |
| GET | `/api/values` | Company values |
| GET | `/api/contact-info` | Contact details |
| POST | `/api/contact` | Submit quote request and email PortilloCeramicTile@gmail.com |

### Contact Form Email

When a visitor submits the contact form, the server sends an email to `PortilloCeramicTile@gmail.com` containing:

- Name
- Email (set as reply-to)
- Phone
- Project type
- Project details

Configure Gmail SMTP in `server/.env` before using the form in development or production.

### Contact Form Payload

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "703-555-0123",
  "projectType": "Bathroom Renovation",
  "message": "I'd like a quote for my master bathroom remodel."
}
```

## Contact

**Abel Portillo**
- Phone: [703-867-0742](tel:703-867-0742)
- Email: [PortilloCeramicTile@gmail.com](mailto:PortilloCeramicTile@gmail.com)

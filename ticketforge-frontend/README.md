# TicketForge Frontend

React + Vite client for ticket issuance and PNR vouchers.

## Prerequisites
- Node.js 18+
- Backend API URL

## Setup
1) Install deps: npm install
2) Create .env with VITE_API_URL=https://ticketforge-yk5f.onrender.com/ (or your backend URL)
3) Run dev server: npm run dev

## Build
- npm run build
- npm run preview   # optional preview of the build

## Lint
- npm run lint

## Notes
- Uses React Router and Axios.
- VITE_API_URL should point at the deployed backend; trailing slash is optional.

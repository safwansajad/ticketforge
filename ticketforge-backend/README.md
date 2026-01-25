## TicketForge Backend

Express + MongoDB API for ticket issuance, PNR vouchers, and PDF generation.

### Stack
- Node.js, Express, Mongoose
- JWT auth
- Puppeteer, bwip-js, qrcode for PDF/barcodes

### Prerequisites
- Node.js 18+
- MongoDB URI (Atlas or local)

### Setup
1) Install deps
```bash
npm install
```
2) Create `.env`
```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster/db
JWT_SECRET=change-me
JWT_EXPIRE=7d
```
3) Run
```bash
npm run dev   # with nodemon
# or
npm start     # plain node
```

### Scripts
- `npm run dev` – nodemon dev server
- `npm start` – start API

### Health Check
- `GET /health` → `{ status: "OK", service: "TicketForge API" }`

### Routes (overview)
- `/api/auth` – agency register/login
- `/api/tickets` – ticket CRUD / PDF
- `/api/airlines` – airline CRUD

### Notes
- CORS is open; lock down `cors()` origins for production.
- Requires `MONGO_URI` and `JWT_SECRET` to start.

# TicketForge

TicketForge is a **B2B flight ticket PDF generation system** built for travel agencies to instantly generate professional flight tickets or booking vouchers for offline or series fare PNRs.

It is **not a booking engine** and does not integrate with airline or GDS systems.  
Its sole purpose is **document generation** with proper branding, structure, and consistency.

---

## 🚀 Why TicketForge Exists

In many real-world agency workflows:

- Suppliers provide a PNR and flight details
- Airline websites may not reflect the PNR immediately
- Agents still need to issue a ticket or voucher instantly

TicketForge solves this gap by generating **ready-to-share PDF tickets** without waiting for airline system sync.

---

## 🧩 Core Features

- Instant ticket PDF generation
- Airline master data with logos
- Agency branding with logo and details
- Passenger, sector, fare, and baggage sections
- Barcode generation (PNR encoded)
- Clean, professional PDF layout
- React-based agent dashboard
- Modular and production-focused architecture

---

## 🏗️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- HTML → PDF rendering
- Barcode generation (PNR only)

### Frontend
- React (Vite)
- Tailwind CSS v4
- Axios
- React Router

---

## 📂 Project Structure

### Backend (`ticketforge-backend`)
# TicketForge

TicketForge is a **B2B flight ticket PDF generation system** built for travel agencies to instantly generate professional flight tickets or booking vouchers for offline or series fare PNRs.

It is **not a booking engine** and does not integrate with airline or GDS systems.  
Its sole purpose is **document generation** with proper branding, structure, and consistency.

---

## 🚀 Why TicketForge Exists

In many real-world agency workflows:

- Suppliers provide a PNR and flight details
- Airline websites may not reflect the PNR immediately
- Agents still need to issue a ticket or voucher instantly

TicketForge solves this gap by generating **ready-to-share PDF tickets** without waiting for airline system sync.

---

## 🧩 Core Features

- Instant ticket PDF generation
- Airline master data with logos
- Agency branding with logo and details
- Passenger, sector, fare, and baggage sections
- Barcode generation (PNR encoded)
- Clean, professional PDF layout
- React-based agent dashboard
- Modular and production-focused architecture

---

## 🏗️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- HTML → PDF rendering
- Barcode generation (PNR only)

### Frontend
- React (Vite)
- Tailwind CSS v4
- Axios
- React Router

---

## 📂 Project Structure

### Backend (`ticketforge-backend`)
# TicketForge

TicketForge is a **B2B flight ticket PDF generation system** built for travel agencies to instantly generate professional flight tickets or booking vouchers for offline or series fare PNRs.

It is **not a booking engine** and does not integrate with airline or GDS systems.  
Its sole purpose is **document generation** with proper branding, structure, and consistency.

---

## 🚀 Why TicketForge Exists

In many real-world agency workflows:

- Suppliers provide a PNR and flight details
- Airline websites may not reflect the PNR immediately
- Agents still need to issue a ticket or voucher instantly

TicketForge solves this gap by generating **ready-to-share PDF tickets** without waiting for airline system sync.

---

## 🧩 Core Features

- Instant ticket PDF generation
- Airline master data with logos
- Agency branding with logo and details
- Passenger, sector, fare, and baggage sections
- Barcode generation (PNR encoded)
- Clean, professional PDF layout
- React-based agent dashboard
- Modular and production-focused architecture

---

## 🏗️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- HTML → PDF rendering
- Barcode generation (PNR only)

### Frontend
- React (Vite)
- Tailwind CSS v4
- Axios
- React Router

---

## 📂 Project Structure

### Backend (`ticketforge-backend`)
src/
├── controllers/
│ └── ticket.controller.js
├── models/
│ ├── ticket.js
│ ├── airline.js
│ └── agency.js
├── routes/
│ └── ticket.routes.js
├── utils/
│ ├── pdf.js
│ ├── barcode.js
│ └── ticketTemplate.js
├── config/
│ └── db.js
├── app.js
└── server.js
### Frontend (`ticketforge-frontend`)
src/
├── api/
│ └── ticket.js
├── pages/
│ ├── Dashboard.jsx
│ └── CreateTicket.jsx
├── layouts/
│ └── MainLayout.jsx
├── App.jsx
├── main.jsx
└── index.css

---

## 🧠 Design Philosophy

- Stateless document generation first
- Controlled master data (airlines, agencies)
- Minimal persistence strategy
- Security-conscious by design
- Optimized for internal B2B usage

---

## ⚠️ Current Known Limitations

- Airline selection UI wiring pending
- Authentication not yet implemented
- Ticket persistence is minimal
- Download by PNR will require auth in production

These are **known and intentional**, not oversights.

---

## 🔐 Security Considerations

- PNR is treated as an identifier, not authentication
- Production usage requires agent authentication (JWT)
- Ticket access should be agency-restricted
- Public PNR-based downloads are discouraged

---

## 🌱 Future Enhancements

- Agent authentication and authorization
- Airline dropdown with logo preview
- Optional ticket persistence with TTL expiry
- Secure re-download by PNR
- Agent ticket history
- Signed, expiring public download links (optional)

---

## ❌ What This Project Is NOT

- Airline booking system
- GDS replacement
- Real-time PNR validator
- Customer-facing portal

---

## 📌 Ideal Use Case

Internal travel agency tool for issuing:
- Series fare tickets
- Offline booking vouchers
- Immediate travel documents

---

## 📜 License

This project is currently intended for private or internal use.

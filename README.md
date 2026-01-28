# TicketForge

> A specialized PDF generation system for travel agencies to produce professional flight tickets and booking vouchers from offline or series fare PNRs.

[![License](https://img.shields.io/badge/license-Private-red.svg)]()
[![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)]()
[![MongoDB](https://img.shields.io/badge/mongodb-%3E%3D5.0-green.svg)]()

**🚀 Live Demo:** [ticketforge.netlify.app](https://ticketforge.netlify.app)

---

## Overview

TicketForge is a B2B document generation platform designed specifically for travel agencies that need to issue flight tickets instantly, independent of airline or GDS system availability. This is **not a booking engine**—it's a specialized tool for converting PNR and flight data into professionally formatted, branded PDF documents.

### The Problem It Solves

In real-world travel agency operations, there's often a critical gap:

- Third-party suppliers provide PNR codes and flight details
- These bookings may not immediately reflect in airline systems
- Customers require instant documentation
- Manual ticket creation is time-consuming and error-prone

TicketForge bridges this gap by enabling instant, on-demand generation of travel documents with consistent branding and professional formatting, without dependency on external system synchronization.

---

## Key Features

### Document Generation
- **Instant PDF Creation** - Generate flight tickets in seconds from structured data
- **Professional Layout** - Clean, airline-standard ticket format
- **Dynamic Barcode Generation** - PNR-encoded barcodes for verification
- **Multi-Sector Support** - Handle complex itineraries with multiple flight segments

### Branding & Customization
- **Agency Branding** - Embed agency logo, contact details, and terms
- **Airline Master Data** - Pre-configured airline information with official logos
- **Consistent Design** - Standardized layout across all generated documents

### Technical Capabilities
- **RESTful API** - Clean, documented endpoints for ticket generation
- **Modular Architecture** - Separation of concerns for maintainability
- **Flexible Data Model** - Support for passengers, sectors, fare breakdown, and baggage allowances
- **Template-Based Rendering** - HTML-to-PDF conversion with customizable templates

---

## Technology Stack

### Backend
```
Node.js         - Runtime environment
Express.js      - Web application framework
MongoDB         - Document database
Mongoose        - ODM for MongoDB
Puppeteer/      - HTML to PDF rendering
  PDFKit
JsBarcode       - Barcode generation
```

### Frontend
```
React 18        - UI library
Vite            - Build tool and dev server
Tailwind CSS v4 - Utility-first CSS framework
Axios           - HTTP client
React Router    - Client-side routing
```

---

## Architecture

### Backend Structure
```
ticketforge-backend/
├── src/
│   ├── controllers/
│   │   └── ticket.controller.js      # Request handling and business logic
│   ├── models/
│   │   ├── ticket.js                 # Ticket data schema
│   │   ├── airline.js                # Airline master data
│   │   └── agency.js                 # Agency configuration
│   ├── routes/
│   │   └── ticket.routes.js          # API route definitions
│   ├── utils/
│   │   ├── pdf.js                    # PDF generation utilities
│   │   ├── barcode.js                # Barcode creation logic
│   │   └── ticketTemplate.js         # HTML template engine
│   ├── config/
│   │   └── db.js                     # Database configuration
│   ├── app.js                        # Express app setup
│   └── server.js                     # Server entry point
├── package.json
└── .env.example
```

### Frontend Structure
```
ticketforge-frontend/
├── src/
│   ├── api/
│   │   └── ticket.js                 # API client methods
│   ├── pages/
│   │   ├── Dashboard.jsx             # Main dashboard view
│   │   └── CreateTicket.jsx          # Ticket creation form
│   ├── layouts/
│   │   └── MainLayout.jsx            # Application layout wrapper
│   ├── App.jsx                       # Root component
│   ├── main.jsx                      # Application entry point
│   └── index.css                     # Global styles
├── package.json
└── vite.config.js
```

---

## API Documentation

### Endpoints

#### `POST /api/tickets/generate`
Generate a new flight ticket PDF.

**Request Body:**
```json
{
  "pnr": "ABC123",
  "bookingDate": "2024-01-15",
  "passengers": [
    {
      "title": "Mr",
      "firstName": "John",
      "lastName": "Doe",
      "type": "ADT"
    }
  ],
  "sectors": [
    {
      "airline": "AI",
      "flightNumber": "101",
      "from": "DEL",
      "to": "BOM",
      "departureDate": "2024-02-01",
      "departureTime": "10:30",
      "arrivalDate": "2024-02-01",
      "arrivalTime": "12:45",
      "class": "Y",
      "baggage": "15 KG"
    }
  ],
  "fareDetails": {
    "baseFare": 5000,
    "taxes": 1200,
    "total": 6200
  }
}
```

**Response:**
```json
{
  "success": true,
  "ticketId": "507f1f77bcf86cd799439011",
  "pdfUrl": "/downloads/ABC123.pdf"
}
```

#### `GET /api/tickets/:pnr`
Retrieve a previously generated ticket by PNR.

---

## Installation

### Prerequisites
- Node.js >= 16.0.0
- MongoDB >= 5.0
- npm or yarn

### Backend Setup

```bash
# Clone the repository
git clone <repository-url>
cd ticketforge-backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your configuration

# Start MongoDB (if running locally)
mongod

# Run development server
npm run dev
```

### Frontend Setup

```bash
cd ticketforge-frontend

# Install dependencies
npm install

# Configure API endpoint
# Edit src/api/ticket.js if needed

# Start development server
npm run dev
```

---

## Environment Configuration

### Backend `.env`
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ticketforge
JWT_SECRET=your-secret-key-here
CORS_ORIGIN=http://localhost:5173
```

### Frontend
API base URL is configured in `src/api/ticket.js`

---

## Design Principles

### Stateless First
Each ticket generation is treated as an independent operation. The system doesn't rely on session state or complex transaction management.

### Controlled Master Data
Airlines and agency configurations are managed as master data with strict validation, ensuring consistency across all generated documents.

### Minimal Persistence
Tickets are generated on-demand. Persistence is optional and configurable, with TTL-based expiry for storage optimization.

### Security-Conscious Design
Built with internal B2B usage in mind. All external-facing features require proper authentication and authorization layers.

---

## Current Limitations & Roadmap

### Known Limitations
- ✗ Agent authentication not implemented (planned)
- ✗ Airline selection UI needs completion
- ✗ Ticket history and search functionality pending
- ✗ Download-by-PNR requires authentication layer

### Planned Enhancements

**Phase 1 - Authentication & Authorization**
- [ ] JWT-based agent authentication
- [ ] Role-based access control (RBAC)
- [ ] Agency-level data isolation

**Phase 2 - Enhanced Features**
- [ ] Airline dropdown with logo preview
- [ ] Ticket history and search
- [ ] Bulk ticket generation
- [ ] Email integration for direct delivery

**Phase 3 - Advanced Capabilities**
- [ ] Signed, time-limited download URLs
- [ ] Ticket template customization UI
- [ ] Multi-language support
- [ ] Analytics and reporting dashboard

---

## Security Considerations

⚠️ **Important Security Notes**

- PNR is used as a document identifier, not as authentication
- Production deployment requires comprehensive authentication
- Ticket access must be restricted by agency boundaries
- Public PNR-based downloads should be disabled or severely restricted
- Implement rate limiting on PDF generation endpoints
- Validate and sanitize all input data to prevent injection attacks

### Recommended Production Security Measures
1. Implement JWT-based authentication
2. Add agency-level authorization checks
3. Use signed URLs for ticket downloads with expiration
4. Enable audit logging for all ticket operations
5. Implement request rate limiting
6. Use HTTPS exclusively
7. Regular security audits and dependency updates

---

## Use Cases

### Ideal Scenarios
- ✓ Issuing tickets for series fare bookings
- ✓ Generating offline booking vouchers
- ✓ Creating immediate travel documents for urgent departures
- ✓ Providing professional documentation for supplier-provided PNRs

### Not Suitable For
- ✗ Real-time airline bookings
- ✗ GDS integration or replacement
- ✗ Customer-facing booking portals
- ✗ PNR validation or verification against live airline systems

---

## Contributing

This project is currently maintained for internal use. Contribution guidelines will be published when the project moves to open-source.

---

## License

**Private / Internal Use Only**

This software is proprietary and intended for internal business operations. Unauthorized distribution or use is prohibited.

---

## Support

For issues, questions, or feature requests, please contact the development team or create an issue in the internal repository.

---

## Acknowledgments

Built with a focus on solving real-world travel agency operational challenges. Special thanks to the agencies who provided valuable feedback during development.

---

**Version:** 1.0.0-beta  
**Last Updated:** January 2026  
**Maintained By:** Development Team

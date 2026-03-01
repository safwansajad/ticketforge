exports.ticketTemplate = (ticket) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    * {
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 12px;
      color: #1a1a1a;
      margin: 0;
      padding: 20px;
      background: #f8f9fa;
    }

    .container {
      background: #ffffff;
      max-width: 900px;
      margin: 0 auto;
      font-size: 12px;
      line-height: 1.5;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    }

    /* HEADER */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 24px 24px 20px;
      border-bottom: 2px solid #e5e7eb;
    }

    .header-left {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      flex: 1;
    }

    .logo-agency {
      height: 50px;
      max-width: 150px;
      object-fit: contain;
    }

    .agency-details {
      font-size: 11px;
      line-height: 1.6;
      color: #4b5563;
    }

    .agency-details strong {
      display: block;
      font-size: 13px;
      color: #111827;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .header-right {
      text-align: right;
    }

    .pnr-box {
      background: #f3f4f6;
      padding: 12px 16px;
      border-radius: 6px;
      border: 1px solid #e5e7eb;
    }

    .pnr-label {
      font-size: 10px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 500;
    }

    .pnr-number {
      font-size: 20px;
      font-weight: 700;
      color: #111827;
      letter-spacing: 1.5px;
      margin-top: 2px;
    }

    /* BOOKING STATUS BAR */
    .status-bar {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 10px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      font-weight: 500;
    }

    .status-bar-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* CONTENT AREA */
    .content {
      padding: 16px 24px;
    }

    /* FLIGHT ROUTE */
    .flight-summary {
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid #e5e7eb;
    }

    .flight-meta {
      font-size: 11px;
      color: #6b7280;
      margin-bottom: 16px;
      display: flex;
      gap: 20px;
      align-items: center;
    }

    .flight-meta strong {
      color: #111827;
    }

    .airline-logo {
      height: 28px;
      max-width: 100px;
      object-fit: contain;
      margin-right: 8px;
      vertical-align: middle;
    }

    .route-display {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-bottom: 16px;
    }

    .route-point {
      text-align: center;
      min-width: 100px;
    }

    .route-code {
      font-size: 24px;
      font-weight: 700;
      color: #111827;
      letter-spacing: 1px;
    }

    .route-time {
      font-size: 14px;
      color: #374151;
      margin-top: 6px;
      font-weight: 500;
    }

    .route-date {
      font-size: 10px;
      color: #6b7280;
      margin-top: 2px;
    }

    .route-connector {
      flex: 1;
      text-align: center;
      position: relative;
      padding: 8px 0;
      min-width: 150px;
    }

    .route-line {
      border-top: 2px solid #e5e7eb;
      position: relative;
      margin-bottom: 24px;
    }

    .route-icon {
      position: absolute;
      left: 50%;
      top: -10px;
      transform: translateX(-50%);
      background: white;
      padding: 0 8px;
      font-size: 16px;
      color: #6b7280;
    }

    .route-duration {
      font-size: 11px;
      color: #6b7280;
      margin-top: 0;
      font-weight: 500;
      position: relative;
    }

    /* FLIGHT DETAILS GRID */
    .flight-details-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 24px;
      padding: 16px;
      background: #f9fafb;
      border-radius: 6px;
    }

    .detail-item {
      text-align: center;
    }

    .detail-label {
      font-size: 10px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
      font-weight: 500;
    }

    .detail-value {
      font-size: 13px;
      color: #111827;
      font-weight: 600;
    }

    /* SECTION HEADERS */
    .section-header {
      font-size: 12px;
      font-weight: 600;
      color: #111827;
      margin: 24px 0 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid #e5e7eb;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* PASSENGER TABLE */
    table.passenger-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
      font-size: 12px;
    }

    table.passenger-table thead {
      background: #f9fafb;
    }

    table.passenger-table th {
      padding: 10px 12px;
      text-align: left;
      font-weight: 600;
      font-size: 11px;
      color: #374151;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      border-bottom: 2px solid #e5e7eb;
    }

    table.passenger-table td {
      padding: 12px;
      border-bottom: 1px solid #f3f4f6;
      color: #1a1a1a;
    }

    table.passenger-table tr:last-child td {
      border-bottom: none;
    }

    .passenger-name {
      font-weight: 600;
      color: #111827;
    }

    .ticket-number {
      font-family: 'Courier New', monospace;
      font-size: 11px;
      color: #6b7280;
      background: #f9fafb;
      padding: 2px 6px;
      border-radius: 3px;
    }

    .status-confirmed {
      color: #10b981;
      font-weight: 600;
      font-size: 11px;
    }

    /* CONTACT & FARE INFO */
    .info-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 24px;
    }

    .info-box {
      background: #f9fafb;
      padding: 16px;
      border-radius: 6px;
      border: 1px solid #e5e7eb;
    }

    .info-box-title {
      font-size: 11px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 11px;
    }

    .info-row:last-child {
      margin-bottom: 0;
    }

    .info-label {
      color: #6b7280;
    }

    .info-value {
      color: #111827;
      font-weight: 500;
    }

    .fare-total {
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid #e5e7eb;
      font-weight: 600;
    }

    .fare-total .info-value {
      font-size: 14px;
      color: #111827;
    }

    /* BAGGAGE */
    .baggage-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-bottom: 12px;
    }

    .baggage-item {
      background: #f9fafb;
      padding: 12px 16px;
      border-radius: 6px;
      border-left: 3px solid #6b7280;
    }

    .baggage-label {
      font-size: 10px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
      font-weight: 500;
    }

    .baggage-value {
      font-size: 13px;
      color: #111827;
      font-weight: 600;
    }

    /* IMPORTANT NOTES */
    .notice-box {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 16px;
      margin: 20px 0;
      border-radius: 4px;
    }

    .notice-box strong {
      color: #92400e;
      display: block;
      margin-bottom: 8px;
      font-size: 12px;
    }

    .notice-box ul {
      margin: 0;
      padding-left: 20px;
      font-size: 11px;
      color: #78350f;
      line-height: 1.6;
    }

    .notice-box li {
      margin-bottom: 6px;
    }

    /* TERMS */
    .terms-section {
      background: #f9fafb;
      padding: 12px 16px;
      border-radius: 6px;
      margin: 12px 0 12px;
      font-size: 10px;
      color: #6b7280;
      line-height: 1.5;
    }

    .terms-section strong {
      color: #374151;
      display: block;
      margin-bottom: 8px;
      font-size: 11px;
    }

    /* FOOTER */
    .footer {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 2px solid #e5e7eb;
      font-size: 9px;
      color: #6b7280;
      line-height: 1.5;
    }

    .footer p {
      margin: 4px 0;
    }

    .copyright {
      text-align: center;
      font-size: 10px;
      color: #9ca3af;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid #e5e7eb;
    }

    /* PAGE BREAK FOR PRINTING - FIXED */
    .page-break {
      page-break-before: always;
      margin-top: 0;
      padding-top: 0;
    }

    .checkin-page {
      background: #ffffff;
      padding: 16px 24px;
    }

    .checkin-header {
      text-align: center;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 2px solid #e5e7eb;
    }

    .checkin-header h2 {
      font-size: 20px;
      font-weight: 700;
      color: #111827;
      margin: 0 0 8px 0;
    }

    .checkin-header p {
      font-size: 12px;
      color: #6b7280;
      margin: 0;
    }

    .checkin-section {
      margin-bottom: 16px;
    }

    .checkin-section-title {
      font-size: 14px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid #e5e7eb;
    }

    .checkin-list {
      margin: 0;
      padding-left: 24px;
      font-size: 12px;
      color: #374151;
      line-height: 1.8;
    }

    .checkin-list li {
      margin-bottom: 8px;
    }

    .checkin-highlight {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 16px;
      margin: 16px 0;
      border-radius: 4px;
    }

    .checkin-highlight strong {
      color: #92400e;
      display: block;
      margin-bottom: 8px;
      font-size: 12px;
    }

    @media print {
      body {
        padding: 0;
        background: white;
      }
      
      .page-break {
        page-break-before: always;
        margin-top: 0;
        padding-top: 0;
      }
      
      .container {
        box-shadow: none;
        max-width: 100%;
      }
    }
  </style>
</head>

<body>
  <div class="container">
    <!-- HEADER -->
    <div class="header">
      <div class="header-left">
        ${
          ticket.agency && ticket.agency.logoUrl
            ? `<img src="${ticket.agency.logoUrl}" class="logo-agency" alt="Agency Logo" />`
            : ''
        }
        <div class="agency-details">
          <strong>${ticket.agency?.name || 'Travel Agency'}</strong>
          ${ticket.agency?.address || ''}<br/>
          ${ticket.agency?.phone ? `Tel: ${ticket.agency.phone}` : ''}<br/>
          ${ticket.agency?.email ? `Email: ${ticket.agency.email}` : ''}
        </div>
      </div>
      <div class="header-right">
        <div class="pnr-box">
          <div class="pnr-label">PNR Number</div>
          <div class="pnr-number">${ticket.pnr}</div>
        </div>
      </div>
    </div>

    <!-- STATUS BAR -->
    <div class="status-bar">
      <div class="status-bar-item">
        <span>●</span>
        <span>Booking Confirmed</span>
      </div>
      <div class="status-bar-item">
        <span>Issued: ${new Date().toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: 'numeric'})}</span>
      </div>
    </div>

    <!-- CONTENT -->
    <div class="content">
      <!-- FLIGHT SUMMARY -->
      <div class="flight-summary">
        <div class="flight-meta">
          ${
            ticket.airline && ticket.airline.logoUrl
              ? `<img src="${ticket.airline.logoUrl}" class="airline-logo" alt="${ticket.airline.name}" />`
              : ''
          }
          <strong>${ticket.airline?.name || 'Airline'}</strong>
          <span>•</span>
          <span>Flight ${ticket.sectors[0]?.flightNumber || 'N/A'}</span>
          <span>•</span>
          <span>${ticket.ticketClass || 'Economy'} Class</span>
        </div>

        <div class="route-display">
          <div class="route-point">
            <div class="route-code">${ticket.sectors[0]?.from || 'N/A'}</div>
            <div class="route-time">
              ${ticket.sectors[0] ? new Date(ticket.sectors[0].departureTime).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC'}) : ''}
            </div>
            <div class="route-date">
              ${ticket.sectors[0] ? new Date(ticket.sectors[0].departureTime).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC'}) : ''}
            </div>
          </div>

          <div class="route-connector">
            <div class="route-line">
              <div class="route-icon">✈</div>
            </div>
            <div class="route-duration">
              ${ticket.flightDuration || (ticket.sectors[0] && ticket.sectors[ticket.sectors.length - 1] ? 
                Math.floor((new Date(ticket.sectors[ticket.sectors.length - 1].arrivalTime) - new Date(ticket.sectors[0].departureTime)) / 3600000) + 'h ' + 
                Math.round(((new Date(ticket.sectors[ticket.sectors.length - 1].arrivalTime) - new Date(ticket.sectors[0].departureTime)) % 3600000) / 60000) + 'm'
                : 'N/A')}
            </div>
          </div>

          <div class="route-point">
            <div class="route-code">${ticket.sectors[ticket.sectors.length - 1]?.to || 'N/A'}</div>
            <div class="route-time">
              ${ticket.sectors[ticket.sectors.length - 1] ? new Date(ticket.sectors[ticket.sectors.length - 1].arrivalTime).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC'}) : ''}
            </div>
            <div class="route-date">
              ${ticket.sectors[ticket.sectors.length - 1] ? new Date(ticket.sectors[ticket.sectors.length - 1].arrivalTime).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC'}) : ''}
            </div>
          </div>
        </div>

        <!-- Flight Details Grid -->
        <div class="flight-details-grid">
          <div class="detail-item">
            <div class="detail-label">Flight Number</div>
            <div class="detail-value">${ticket.sectors[0]?.flightNumber || 'N/A'}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Status</div>
            <div class="detail-value" style="color: #10b981;">${ticket.status || 'CONFIRMED'}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Ticket Type</div>
            <div class="detail-value">${ticket.ticketType || 'SERIES_FARE'}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Issued On</div>
            <div class="detail-value">${new Date(ticket.issuedAt).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: 'numeric'})}</div>
          </div>
        </div>
      </div>

      <!-- PASSENGER DETAILS -->
      <div class="section-header">Passenger Details</div>
      <table class="passenger-table">
        <thead>
          <tr>
            <th>Passenger Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Barcode</th>
          </tr>
        </thead>
        <tbody>
          ${ticket.passengers.map((p, idx) => `
            <tr>
              <td class="passenger-name">${p.title} ${p.firstName} ${p.lastName}</td>
              <td>${p.type}</td>
              <td><span class="status-confirmed">Confirmed</span></td>
              <td style="text-align: center;">
                ${ticket.barcodeImage ? `<img src="${ticket.barcodeImage}" alt="Barcode" style="height: 28px; width: auto;" />` : '—'}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- CONTACT & FARE INFO -->
      <div class="info-section">
        <div class="info-box">
          <div class="info-box-title">Contact Information</div>
          <div class="info-row">
            <span class="info-label">Email</span>
            <span class="info-value">${ticket.contact?.email || 'N/A'}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Phone</span>
            <span class="info-value">${ticket.contact?.phone || 'N/A'}</span>
          </div>
        </div>

        <div class="info-box">
          <div class="info-box-title">Fare Summary</div>
          <div class="info-row">
            <span class="info-label">Base Fare</span>
            <span class="info-value">${ticket.fare?.base || 'N/A'}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Taxes & Fees</span>
            <span class="info-value">${ticket.fare?.tax || 'N/A'}</span>
          </div>
          <div class="info-row fare-total">
            <span class="info-label">Total Amount</span>
            <span class="info-value">${ticket.fare?.total || 'N/A'} ${ticket.fare?.currency || 'INR'}</span>
          </div>
        </div>
      </div>

      <!-- BAGGAGE ALLOWANCE -->
      <div class="section-header">Baggage Allowance</div>
      <div class="baggage-grid">
        <div class="baggage-item">
          <div class="baggage-label">Check-in Baggage</div>
          <div class="baggage-value">${ticket.baggage?.checkin || '15 KG'}</div>
        </div>
        <div class="baggage-item">
          <div class="baggage-label">Cabin Baggage</div>
          <div class="baggage-value">${ticket.baggage?.cabin || '7 KG'}</div>
        </div>
      </div>

      <!-- TERMS & CONDITIONS -->
      <div class="terms-section">
        <strong>Terms & Conditions</strong>
        This e-ticket is subject to the airline's conditions of carriage. Cancellation, refund, and date change rules vary by fare type. Passengers are responsible for valid travel documents including passports and visas. The airline reserves the right to deny boarding for security or operational reasons.
      </div>

      <!-- FOOTER -->
      <div class="footer">
        <p><strong>Booking Agency:</strong> ${ticket.agency?.name || 'Travel Agency'}</p>
        <p><strong>PNR Reference:</strong> ${ticket.pnr} | <strong>Ticket Issued:</strong> ${new Date(ticket.issuedAt || Date.now()).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: 'numeric'})}</p>
        ${ticket.remarks ? `<p><strong>Remarks:</strong> ${ticket.remarks}</p>` : ''}
        <div class="copyright">
          © ${new Date().getFullYear()} ${ticket.agency?.name || 'Travel Agency'}. All rights reserved. | Powered by TicketForge
        </div>
      </div>
    </div>

    <!-- PAGE 2: CHECK-IN INFORMATION -->
    <div class="page-break">
      <div class="checkin-page">
        <div class="checkin-header">
          <h2>✈ Check-in & Travel Information</h2>
          <p>PNR: <strong>${ticket.pnr}</strong> | ${ticket.airline?.name || 'Airline'} | Flight ${ticket.sectors[0]?.flightNumber || 'N/A'}</p>
        </div>

        <!-- Web Check-in -->
        <div class="checkin-section">
          <div class="checkin-section-title">🌐 Web Check-in</div>
          <ul class="checkin-list">
            <li>Web check-in opens <strong>24 hours before departure</strong> on the airline's website or mobile app</li>
            <li>Visit: ${ticket.airline?.website || 'airline website'}</li>
            <li>Use your PNR <strong>${ticket.pnr}</strong> for online check-in</li>
            <li>Download your boarding pass after completing web check-in</li>
            <li>Web check-in saves time at the airport and allows seat selection</li>
          </ul>
        </div>

        <!-- Airport Check-in -->
        <div class="checkin-section">
          <div class="checkin-section-title">🏢 Airport Check-in</div>
          <ul class="checkin-list">
            <li>Check-in counters open <strong>2-3 hours before departure</strong></li>
            <li>Arrive at the airport at least <strong>2 hours prior</strong> for domestic flights</li>
            <li>For international flights, arrive <strong>3 hours before departure</strong></li>
            <li>Check-in closes <strong>45-60 minutes before departure</strong> (varies by airline)</li>
            <li>Have your PNR and valid photo ID ready at the counter</li>
          </ul>
        </div>

        <!-- Required Documents -->
        <div class="checkin-section">
          <div class="checkin-section-title">📋 Required Documents</div>
          <ul class="checkin-list">
            <li><strong>Valid Government-issued Photo ID</strong> (Aadhaar, Passport, Driving License, Voter ID)</li>
            <li>For domestic flights within India: Original photo ID card is mandatory</li>
            <li>For international flights: Valid passport with minimum 6 months validity</li>
            <li>For infants: Birth certificate or passport is mandatory</li>
            <li>Student ID alone is not acceptable as valid identification</li>
          </ul>
        </div>

        <!-- Baggage Guidelines -->
        <div class="checkin-section">
          <div class="checkin-section-title">🧳 Baggage Guidelines</div>
          <ul class="checkin-list">
            <li>Check-in Baggage: <strong>${ticket.baggage?.checkin || '15 KG'}</strong> per person</li>
            <li>Cabin/Hand Baggage: <strong>${ticket.baggage?.cabin || '7 KG'}</strong> per person</li>
            <li>Excess baggage charges apply for weight beyond allowance</li>
            <li>Liquids in cabin baggage must be in containers ≤ 100ml, packed in transparent bag</li>
            <li>Prohibited items: Sharp objects, flammables, explosives, liquids >100ml in cabin</li>
            <li>Check airline website for complete list of restricted items</li>
          </ul>
        </div>

        <!-- Security & Immigration -->
        <div class="checkin-section">
          <div class="checkin-section-title">🛂 Security & Immigration</div>
          <ul class="checkin-list">
            <li>Allow sufficient time for security check and immigration clearance</li>
            <li>Keep boarding pass, ID, and travel documents easily accessible</li>
            <li>Remove laptops, large electronics, and liquids for separate screening</li>
            <li>Cooperate with security personnel and follow all instructions</li>
            <li>Report any unattended baggage or suspicious activity immediately</li>
          </ul>
        </div>

        <!-- Important Notice -->
        <div class="checkin-highlight">
          <strong>⚠ Important Notice</strong>
          <ul class="checkin-list" style="margin-top: 8px;">
            <li>Airlines reserve the right to deny boarding if passenger arrives late or documentation is incomplete</li>
            <li>This ticket is non-transferable. Name changes are not permitted after booking</li>
            <li>Reconfirm your flight 24 hours before departure, especially during peak travel seasons</li>
            <li>For any changes, cancellations, or queries, contact <strong>${ticket.agency?.name || 'your travel agency'}</strong></li>
            <li>Keep this ticket and all travel documents safe throughout your journey</li>
          </ul>
        </div>

        <!-- Contact Information -->
        <div class="checkin-section">
          <div class="checkin-section-title">📞 Need Help?</div>
          <ul class="checkin-list">
            <li><strong>Agency:</strong> ${ticket.agency?.name || 'Travel Agency'} | ${ticket.agency?.phone || 'Contact Number'}</li>
            <li><strong>Email:</strong> ${ticket.agency?.email || 'agency@email.com'}</li>
            <li><strong>Airline Customer Care:</strong> Check airline website for 24/7 helpline</li>
            <li><strong>Emergency:</strong> Contact your agency or airline immediately for flight changes</li>
          </ul>
        </div>

        <div class="copyright" style="margin-top: 32px;">
          Safe travels! Have a pleasant journey. | Powered by TicketForge
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`;
};
import { useState, useEffect, useContext } from 'react'
import MainLayout from '../layouts/MainLayout'
import { createTicket, downloadTicketPDF } from '../api/ticket'
import { getAllAirlines } from '../api/airline'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function CreateTicket() {
  const navigate = useNavigate()
  const { user, token } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [airlines, setAirlines] = useState([])
  const [selectedAirline, setSelectedAirline] = useState('')

  const [ticket, setTicket] = useState({
    pnr: '',
    from: '',
    to: '',
    flightNumber: '',
    departureTime: '',
    arrivalTime: '',
    passengers: [
      { title: 'Mr', firstName: '', lastName: '', type: 'ADT' }
    ],
    fare: {
      base: '',
      tax: '',
      otherCharges: ''
    }
  })

  // Fetch airlines on component mount
  useEffect(() => {
    const fetchAirlines = async () => {
      try {
        const response = await getAllAirlines()
        console.log('Loaded airlines:', response)
        setAirlines(response)
        // Auto-select first airline if available
        if (response.length > 0) {
          setSelectedAirline(response[0]._id)
        }
      } catch (error) {
        console.error('Failed to fetch airlines:', error)
        alert('Could not load airlines')
      }
    }

    fetchAirlines()
  }, [])

  const handleChange = (field, value) => {
    setTicket({ ...ticket, [field]: value })
  }

  const handlePassengerChange = (index, field, value) => {
    const updated = [...ticket.passengers]
    updated[index][field] = value
    setTicket({ ...ticket, passengers: updated })
  }

  const addPassenger = () => {
    setTicket({
      ...ticket,
      passengers: [
        ...ticket.passengers,
        { title: 'Mr', firstName: '', lastName: '', type: 'ADT' }
      ]
    })
  }

  const handleSubmit = async () => {
    try {
      if (!ticket.pnr || !ticket.from || !ticket.to) {
        alert('PNR, From and To are required')
        return
      }

      if (!selectedAirline) {
        alert('Please select an airline')
        return
      }

      if (!token) {
        alert('Authentication token missing. Please log in again.')
        return
      }

      setLoading(true)

      const base = Number(ticket.fare.base || 0)
      const tax = Number(ticket.fare.tax || 0)
      const other = Number(ticket.fare.otherCharges || 0)

      const payload = {
        pnr: ticket.pnr,
        airline: selectedAirline,
        status: 'CONFIRMED',
        sectors: [
          {
            from: ticket.from,
            to: ticket.to,
            flightNumber: ticket.flightNumber,
            departureTime: new Date(ticket.departureTime).toISOString(),
            arrivalTime: new Date(ticket.arrivalTime).toISOString()
          }
        ],
        passengers: ticket.passengers,
        fare: {
          base,
          tax,
          otherCharges: other,
          total: base + tax + other,
          currency: 'INR'
        }
      }

      const res = await createTicket(payload, token)

      if (res.success) {
        // Download PDF using the API
        try {
          const pdfBlob = await downloadTicketPDF(res.data.pnr, token)
          const url = window.URL.createObjectURL(pdfBlob)
          const a = document.createElement('a')
          a.href = url
          a.download = `${res.data.pnr}.pdf`
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(url)
          document.body.removeChild(a)
        } catch (pdfErr) {
          console.error('PDF download error:', pdfErr)
          alert('Ticket created but PDF download failed')
        }
        navigate('/')
      }
    } catch (err) {
      console.error(err)
      alert(err.message || 'Ticket creation failed')
    } finally {
      setLoading(false)
    }
  }

  const removePassenger = (index) => {
    if (ticket.passengers.length === 1) return
    const updated = ticket.passengers.filter((_, i) => i !== index)
    setTicket({ ...ticket, passengers: updated })
  }

  const calculateTotal = () => {
    const base = Number(ticket.fare.base || 0)
    const tax = Number(ticket.fare.tax || 0)
    const other = Number(ticket.fare.otherCharges || 0)
    return base + tax + other
  }

  return (
    <MainLayout>
      {/* Header Section with Gradient */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Generate Flight Ticket
            </h1>
          </div>
          {user && (
            <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-xl border-2 border-blue-200">
              {user.logoUrl && (
                <img src={user.logoUrl} alt={user.name} className="h-8 rounded" />
              )}
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          )}
        </div>
        <p className="text-gray-500 ml-6 text-sm">Create professional ticket documents instantly</p>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Airline Selection Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 shadow-lg shadow-blue-100/50 transition-all hover:shadow-xl hover:shadow-blue-200/50">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Select Airline</label>
          </div>
          <select
            className="w-full bg-white border-2 border-blue-200 rounded-xl px-4 py-3 text-gray-800 font-medium focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all shadow-sm cursor-pointer"
            value={selectedAirline}
            onChange={(e) => setSelectedAirline(e.target.value)}
          >
            <option value="">✈️ Choose Airline</option>
            {airlines.map((airline) => (
              <option key={airline._id} value={airline._id}>
                {airline.name} ({airline.code})
              </option>
            ))}
          </select>
        </div>

        {/* Flight Details Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Flight Details</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* PNR */}
            <div className="group">
              <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">PNR Code</label>
              <input
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-mono font-semibold focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all placeholder:text-gray-400"
                placeholder="e.g., ABC123"
                value={ticket.pnr}
                onChange={(e) => handleChange('pnr', e.target.value.toUpperCase())}
              />
            </div>

            {/* Flight Number */}
            <div className="group">
              <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">Flight Number</label>
              <input
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-semibold focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all placeholder:text-gray-400"
                placeholder="e.g., 6E-2134"
                value={ticket.flightNumber}
                onChange={(e) => handleChange('flightNumber', e.target.value.toUpperCase())}
              />
            </div>

            {/* From */}
            <div className="group">
              <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">From (Origin)</label>
              <input
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-semibold focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all placeholder:text-gray-400"
                placeholder="e.g., DEL"
                value={ticket.from}
                onChange={(e) => handleChange('from', e.target.value.toUpperCase())}
              />
            </div>

            {/* To */}
            <div className="group">
              <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">To (Destination)</label>
              <input
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-semibold focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all placeholder:text-gray-400"
                placeholder="e.g., BOM"
                value={ticket.to}
                onChange={(e) => handleChange('to', e.target.value.toUpperCase())}
              />
            </div>

            {/* Departure Time */}
            <div className="group">
              <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">Departure Date & Time</label>
              <input
                type="datetime-local"
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-medium focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all"
                value={ticket.departureTime}
                onChange={(e) => handleChange('departureTime', e.target.value)}
              />
            </div>

            {/* Arrival Time */}
            <div className="group">
              <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">Arrival Date & Time</label>
              <input
                type="datetime-local"
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-medium focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all"
                value={ticket.arrivalTime}
                onChange={(e) => handleChange('arrivalTime', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Passengers Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Passengers ({ticket.passengers.length})</h2>
            </div>
            <button 
              onClick={addPassenger}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:from-green-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Passenger
            </button>
          </div>

          <div className="space-y-4">
            {ticket.passengers.map((p, index) => (
              <div key={index} className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border-2 border-gray-200 hover:border-green-300 transition-all">
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {index + 1}
                </div>
                
                {ticket.passengers.length > 1 && (
                  <button
                    onClick={() => removePassenger(index)}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all"
                    title="Remove passenger"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}

                <div className="grid md:grid-cols-4 gap-4 mt-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Title</label>
                    <select
                      className="w-full bg-white border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition-all"
                      value={p.title}
                      onChange={(e) => handlePassengerChange(index, 'title', e.target.value)}
                    >
                      <option>Mr</option>
                      <option>Ms</option>
                      <option>Mrs</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">First Name</label>
                    <input
                      className="w-full bg-white border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition-all placeholder:text-gray-400"
                      placeholder="John"
                      value={p.firstName}
                      onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Last Name</label>
                    <input
                      className="w-full bg-white border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition-all placeholder:text-gray-400"
                      placeholder="Doe"
                      value={p.lastName}
                      onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Type</label>
                    <select
                      className="w-full bg-white border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition-all"
                      value={p.type}
                      onChange={(e) => handlePassengerChange(index, 'type', e.target.value)}
                    >
                      <option value="ADT">Adult</option>
                      <option value="CHD">Child</option>
                      <option value="INF">Infant</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fare Card */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Fare Breakdown</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Base Fare (₹)</label>
              <input
                type="number"
                className="w-full bg-white border-2 border-amber-200 rounded-xl px-4 py-3 text-gray-800 font-semibold focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition-all placeholder:text-gray-400"
                placeholder="5000"
                value={ticket.fare.base}
                onChange={(e) => setTicket({ ...ticket, fare: { ...ticket.fare, base: e.target.value } })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Tax (₹)</label>
              <input
                type="number"
                className="w-full bg-white border-2 border-amber-200 rounded-xl px-4 py-3 text-gray-800 font-semibold focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition-all placeholder:text-gray-400"
                placeholder="500"
                value={ticket.fare.tax}
                onChange={(e) => setTicket({ ...ticket, fare: { ...ticket.fare, tax: e.target.value } })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Other Charges (₹)</label>
              <input
                type="number"
                className="w-full bg-white border-2 border-amber-200 rounded-xl px-4 py-3 text-gray-800 font-semibold focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition-all placeholder:text-gray-400"
                placeholder="200"
                value={ticket.fare.otherCharges}
                onChange={(e) => setTicket({ ...ticket, fare: { ...ticket.fare, otherCharges: e.target.value } })}
              />
            </div>
          </div>

          {/* Total Display */}
          <div className="bg-white rounded-xl p-4 border-2 border-amber-300 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-700">Total Amount</span>
              <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                ₹{calculateTotal().toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="relative px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
          >
            {loading && (
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 animate-pulse"></span>
            )}
            <span className="relative flex items-center gap-3">
              {loading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Ticket...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Generate Ticket PDF
                </>
              )}
            </span>
          </button>
        </div>

      </div>
    </MainLayout>
  )
}

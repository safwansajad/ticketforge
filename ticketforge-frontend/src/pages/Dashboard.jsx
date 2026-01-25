import MainLayout from '../layouts/MainLayout'
import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { downloadTicketPDF } from '../api/ticket'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, token } = useContext(AuthContext)
  const [pnr, setPnr] = useState('')
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    if (!pnr.trim()) {
      alert('Please enter a PNR')
      return
    }

    try {
      setLoading(true)
      const pdfBlob = await downloadTicketPDF(pnr, token)
      
      // Create download link
      const url = window.URL.createObjectURL(pdfBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${pnr}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      setPnr('')
    } catch (err) {
      alert(err.message || 'Failed to download PDF')
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      {/* Welcome Banner */}
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-100 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Welcome, {user?.name}! 👋
            </h1>
            <p className="text-gray-600">
              Manage your flight ticket generation here. Create new tickets or download existing ones instantly.
            </p>
          </div>
          {user?.logoUrl && (
            <img src={user.logoUrl} alt={user.name} className="h-24 rounded-lg shadow-lg" />
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Agency Name</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">{user?.name}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5.581m0 0H9m3.419 0H9m0 0a2 2 0 100-4m0 4a2 2 0 110-4m0 0V7m0 4h0m0 0v4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Email</p>
              <p className="text-sm font-bold text-gray-800 mt-2">{user?.email}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Status</p>
              <p className="text-2xl font-bold text-green-600 mt-2">Active ✓</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Grid */}
      <div className="grid gap-6 md:grid-cols-2">

        {/* Create Ticket */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-xl p-8 border-2 border-blue-200 hover:shadow-2xl transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Create New Ticket
            </h2>
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Issue a new flight ticket with comprehensive passenger and fare details. PDF will be generated instantly.
          </p>

          <button
            onClick={() => navigate('/create-ticket')}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Create Ticket
          </button>
        </div>

        {/* Download Ticket */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-xl p-8 border-2 border-purple-200 hover:shadow-2xl transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Download Ticket
            </h2>
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Enter the PNR (Passenger Name Record) to download and view the ticket PDF.
          </p>

          <div className="space-y-3">
            <input
              type="text"
              value={pnr}
              onChange={(e) => setPnr(e.target.value.toUpperCase())}
              placeholder="Enter PNR (e.g., ABC123)"
              className="w-full bg-white border-2 border-purple-300 rounded-xl px-4 py-3 font-semibold focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all placeholder:text-gray-400"
            />

            <button
              onClick={handleDownload}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Downloading...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Download PDF
                </>
              )}
            </button>
          </div>
        </div>

      </div>

    </MainLayout>
  );
}

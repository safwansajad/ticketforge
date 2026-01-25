import { useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function MainLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useContext(AuthContext)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-100">
      
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold">TicketForge</h1>
            <p className="text-xs text-gray-400">Professional Flight Ticket System</p>
          </div>
        </div>

        {/* Navigation & User Menu */}
        <div className="flex items-center gap-6">
          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => navigate('/')}
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'text-blue-400 border-b-2 border-blue-400 pb-1' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/create-ticket')}
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/create-ticket' 
                  ? 'text-blue-400 border-b-2 border-blue-400 pb-1' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Create Ticket
            </button>
          </nav>

          {/* User Info & Logout */}
          {user && (
            <div className="flex items-center gap-4 pl-6 border-l border-slate-700">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Page Content */}
      <main className="p-6 max-w-7xl mx-auto">
        {children}
      </main>

    </div>
  );
}

import axios from 'axios'

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '')
const API_URL = `${BASE_URL}/api/tickets`

export const createTicket = async (payload, token) => {
  try {
    const res = await axios.post(`${API_URL}/create`, payload, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return res.data
  } catch (err) {
    console.error('CREATE TICKET ERROR:', err.response?.data || err.message)
    throw new Error(
      err.response?.data?.message || 'Failed to create ticket'
    )
  }
}

export const downloadTicketPDF = async (pnr, token) => {
  try {
    const res = await axios.get(`${API_URL}/${pnr}/pdf`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      responseType: 'blob'
    })
    return res.data
  } catch (err) {
    console.error('DOWNLOAD PDF ERROR:', err.response?.data || err.message)
    throw new Error(
      err.response?.data?.message || 'Failed to download PDF'
    )
  }
}

export const getTicketByPNR = async (pnr, token) => {
  try {
    const res = await axios.get(`${API_URL}/${pnr}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return res.data
  } catch (err) {
    console.error('GET TICKET ERROR:', err.response?.data || err.message)
    throw new Error(
      err.response?.data?.message || 'Failed to fetch ticket'
    )
  }
}

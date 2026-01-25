import axios from 'axios'

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '')

const API = axios.create({
  baseURL: `${BASE_URL}/api`
})

export const getAllAirlines = async () => {
  const response = await API.get('/airlines')
  return response.data
}

export const getAirlineById = async (id) => {
  const response = await API.get(`/airlines/${id}`)
  return response.data
}

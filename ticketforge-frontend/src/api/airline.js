import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
})

export const getAllAirlines = async () => {
  const response = await API.get('/airlines')
  return response.data
}

export const getAirlineById = async (id) => {
  const response = await API.get(`/airlines/${id}`)
  return response.data
}

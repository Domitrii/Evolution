const apiUrl = import.meta.env.VITE_API_URL
import axios from 'axios'

export const api = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
})

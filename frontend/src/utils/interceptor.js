import axios from 'axios'
import { getToken } from './token'

export const services = axios.create({
    baseURL: 'http://localhost:8080',
})

services.interceptors.request.use((req) => {
    const token = getToken()
    if (token) {
        req.headers = { 'x-access-token': token }
    }
    return req
})

services.interceptors.response.use(
    (res) => res,
    (error) => {
        const { status } = error.response
        if (getToken() && (status === 401 || status === 403)) {
            localStorage.clear()
            sessionStorage.clear()
            window.location.reload()
        }
        return Promise.reject(error)
    }
)

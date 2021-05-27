import axios from 'axios'
import { getToken } from './token'

export const services = axios.create({
    baseURL: 'http://localhost:8080',
})

services.interceptors.request.use((req) => {
    const token = getToken()
    if (token) {
        req.headers = {
            'x-access-token': token,
            'Content-Type': 'application/json',
        }
    }
    return req
})

services.interceptors.response.use(
    (res) => res,
    (error) => {
        const { status } = error.response

        return Promise.reject(error)
    }
)

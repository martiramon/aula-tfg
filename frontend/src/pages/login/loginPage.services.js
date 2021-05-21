import { services } from '../../utils'

export const loginService = async (email, password) => {
    try {
        const response = await services.post('/api/auth/signin', {
            email,
            password,
        })
        return response.data
    } catch (error) {
        return {
            error: error.response.data.message,
        }
    }
}

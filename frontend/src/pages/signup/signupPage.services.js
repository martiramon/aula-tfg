import { services } from '../../utils'

export const signupService = async (email, password, nom, escola) => {
    try {
        const response = await services.post('/api/auth/signup', {
            email,
            password,
            nom,
            escola,
        })
        return response.data
    } catch (error) {
        return {
            error: error.response.data.message,
        }
    }
}

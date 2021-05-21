import { services } from '../../utils'

export const getAules = async () => {
    try {
        const response = await services.get('/api/aules')
        return response.data
    } catch (error) {
        return {
            error: error.response.data.message,
        }
    }
}

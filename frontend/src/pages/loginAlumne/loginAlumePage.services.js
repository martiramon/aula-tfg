import { services } from '../../utils'

export const getAlumnesCodiService = async (aulaCodi) => {
    try {
        const response = await services.get('/api/alumnesAula/' + aulaCodi)
        return response.data
    } catch (error) {
        return {
            error: error.response.data.message,
        }
    }
}

import { services } from '../../utils'

export const postTest = async (aula, preguntes) => {
    try {
        const response = await services.post('/api/test', {
            aula,
            preguntes,
        })
        return response.data
    } catch (error) {
        return {
            error: error.response.data.message,
        }
    }
}

import { services } from '../../utils'

export const getTest = async (testId) => {
    try {
        const response = await services.get('/api/testId/' + testId)
        return response.data
    } catch (error) {
        return { error: error.response.data.message }
    }
}

export const getAlumnes = async (aulaId) => {
    try {
        const response = await services.get('/api/alumnes/' + aulaId)
        return response.data
    } catch (error) {
        return {
            error: error.response.data.message,
        }
    }
}

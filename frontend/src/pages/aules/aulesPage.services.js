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

export const postAula = async (nom) => {
    try {
        const response = await services.post('/api/aulanova', {
            nom,
        })
        return response.data
    } catch (error) {
        return {
            error: error.response.data.message,
        }
    }
}

export const getAlumnes = async (nom) => {
    try {
        const response = await services.get('/api/alumnes', {
            nom,
        })
        return response.data
    } catch (error) {
        return {
            error: error.response.data.message,
        }
    }
}

export const postAlumne = async (nom, aulaId) => {
    try {
        const response = await services.post('/api/alumnenou', {
            nom,
            aulaId,
        })
        return response.data
    } catch (error) {
        return {
            error: error.response.data.message,
        }
    }
}

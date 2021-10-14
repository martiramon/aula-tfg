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
        const response = await services.post('/api/aula', {
            nom,
        })
        return response.data
    } catch (error) {
        return {
            error: error.response.data.message,
        }
    }
}

export const getAlumnes = async (aulaId) => {
    try {
        const response = await services.get('/api/aules/alumnes/' + aulaId)
        return response.data
    } catch (error) {
        return {
            error: error.response.data.message,
        }
    }
}

export const postAlumne = async (nom, aulaId) => {
    try {
        const response = await services.post('/api/alumne', {
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

export const deleteAlumne = async (alumneId) => {
    try {
        const response = await services.delete('/api/alumne/' + alumneId)
        return response.data
    } catch (error) {
        return {
            error: error.response.data.message,
        }
    }
}

export const deleteAula = async (aulaId) => {
    try {
        const response = await services.delete('/api/aula/' + aulaId)
        return response.data
    } catch (error) {
        return {
            error: error.response.data.message,
        }
    }
}

export const getRespostes = async (testId) => {
    try {
        const response = await services.get('/api/test/respostes/' + testId)
        return response.data
    } catch (error) {
        return { error: error.response.data.message }
    }
}

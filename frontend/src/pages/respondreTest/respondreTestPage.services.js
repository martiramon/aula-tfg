import { services } from '../../utils'

export const getTestAula = async (aulaId) => {
    try {
        const response = await services.get('/api/aula/test/' + aulaId)
        return response.data
    } catch (error) {
        return {
            error: error.response.data.message,
        }
    }
}

export const postResposta = async (autor, test, respostes) => {
    try {
        const response = await services.post('/api/resposta', {
            autor,
            test,
            respostes,
        })
        return response.data
    } catch (error) {
        return {
            error: error.response.data.message,
        }
    }
}

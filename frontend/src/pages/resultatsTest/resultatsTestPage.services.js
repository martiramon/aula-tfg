import { services } from '../../utils'

export const getTestResp = async (testId) => {
    try {
        const response = await services.get('/api/testRespostes/' + testId)
        return response.data
    } catch (error) {
        return { error: error.response.data.message }
    }
}

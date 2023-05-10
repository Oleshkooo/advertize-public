import { ApiError, ApiSuccess, STATUS, SUCCESS } from '@/api/responses'
import { AdspaceService, modifyData, type IAdspace } from '@/database'

import type { RequestHandler } from 'express'

export const get: RequestHandler = async (req, res) => {
    try {
        let adspace = await new AdspaceService().getAll()
        adspace = modifyData(adspace)

        const response = new ApiSuccess<IAdspace[]>({
            status: STATUS.OK,
            message: SUCCESS.GET_DATA,
            data: adspace,
        })
        return res.status(response.status).send(response)
    } catch (error) {
        const response = ApiError.internalServerError(error)
        return res.status(response.status).send(response)
    } finally {
        res.end()
    }
}

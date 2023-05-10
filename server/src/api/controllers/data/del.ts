import { ApiError, ApiSuccess, ERROR, STATUS, SUCCESS } from '@/api/responses'
import { validateDelete } from '@/api/validators/data'
import { AdspaceModel } from '@/database'

import type { RequestHandler } from 'express'

export const del: RequestHandler = async (req, res) => {
    try {
        const { _id } = req.body

        if (!validateDelete(req.body)) {
            const response = new ApiError({
                status: STATUS.BAD_REQUEST,
                message: ERROR.INVALID_DATA,
            })
            return res.status(response.status).send(response)
        }

        const adspace = await AdspaceModel.findOne({ _id }).clone()

        if (adspace === null) {
            const response = new ApiError({
                status: STATUS.NOT_FOUND,
                message: ERROR.NOT_FOUND,
            })
            return res.status(response.status).send(response)
        }

        await AdspaceModel.deleteOne({ _id }).clone()

        const response = new ApiSuccess({
            status: STATUS.OK,
            message: SUCCESS.DELETE_DATA,
        })
        return res.status(response.status).send(response)
    } catch (error) {
        const response = ApiError.internalServerError(error)
        return res.status(response.status).send(response)
    } finally {
        res.end()
    }
}

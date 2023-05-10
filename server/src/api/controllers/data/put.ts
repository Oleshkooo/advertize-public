import { ApiError, ApiSuccess, ERROR, STATUS, SUCCESS } from '@/api/responses'
import { validatePut } from '@/api/validators/data'
import { AdspaceModel, AdspaceService } from '@/database'

import type { RequestHandler } from 'express'

export const put: RequestHandler = async (req, res) => {
    try {
        const item = req.body

        if (!validatePut(item)) {
            const response = new ApiError({
                status: STATUS.BAD_REQUEST,
                message: ERROR.INVALID_DATA,
            })
            return res.status(response.status).send(response)
        }

        const normalizedAdspace = new AdspaceService().normalizeSides(item)
        const newAdspace = new AdspaceModel(normalizedAdspace)
        const validationError = newAdspace.validateSync()

        if (validationError !== undefined) {
            const response = new ApiError({
                status: STATUS.BAD_REQUEST,
                message: ERROR.INVALID_DATA,
                error: validationError,
            })
            return res.status(response.status).send(response)
        }

        await AdspaceModel.updateOne(
            { _id: item._id },
            {
                type: item.type,
                lat: item.lat,
                lng: item.lng,
                sides: item.sides,
            },
        )

        const response = new ApiSuccess({
            status: STATUS.OK,
            message: SUCCESS.PUT_DATA,
        })
        return res.status(response.status).send(response)
    } catch (error) {
        const response = ApiError.internalServerError(error)
        return res.status(response.status).send(response)
    } finally {
        res.end()
    }
}

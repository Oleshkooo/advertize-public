import { ApiError, ApiSuccess, ERROR, STATUS, SUCCESS } from '@/api/responses'
import { validatePost } from '@/api/validators/data'
import { AdspaceModel } from '@/database'
import { AdspaceService } from '@/database/services'

import type { RequestHandler } from 'express'

export const post: RequestHandler = async (req, res) => {
    try {
        const item = req.body

        if (!validatePost(req.body)) {
            const response = new ApiError({
                status: STATUS.BAD_REQUEST,
                message: ERROR.INVALID_DATA,
            })
            return res.status(response.status).send(response)
        }

        const maxId = await new AdspaceService().getMaxId()
        const normalizedAdspace = new AdspaceService().normalizeSides(item)
        const newAdspace = new AdspaceModel({
            ...normalizedAdspace,
            id: maxId + 1,
        })
        const validationError = newAdspace.validateSync()

        if (validationError !== undefined) {
            const response = new ApiError({
                status: STATUS.BAD_REQUEST,
                message: ERROR.INVALID_DATA,
                error: validationError,
            })
            return res.status(response.status).send(response)
        }

        await newAdspace.save()

        const response = new ApiSuccess({
            status: STATUS.OK,
            message: SUCCESS.POST_DATA,
        })
        return res.status(response.status).send(response)
    } catch (error) {
        const response = ApiError.internalServerError(error)
        return res.status(response.status).send(response)
    } finally {
        res.end()
    }
}

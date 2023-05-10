import { ApiError, ApiSuccess, ERROR, STATUS, SUCCESS } from '@/api/responses'
import { validatePost } from '@/api/validators/login'
import { AdminsService } from '@/database'

import type { RequestHandler } from 'express'

export const post: RequestHandler = async (req, res) => {
    try {
        const { username, password } = req.body

        if (!validatePost(req.body)) {
            const response = new ApiError({
                status: STATUS.BAD_REQUEST,
                message: ERROR.INVALID_DATA,
            })
            return res.status(response.status).send(response)
        }

        const admin = await new AdminsService().getByUsername(username)
        if (admin === null) {
            const response = new ApiError({
                status: STATUS.BAD_REQUEST,
                message: ERROR.LOGIN,
            })
            return res.status(response.status).send(response)
        }

        const isPasswordCorrect = await admin.isPasswordCorrect(password)
        if (!isPasswordCorrect) {
            const response = new ApiError({
                status: STATUS.BAD_REQUEST,
                message: ERROR.LOGIN,
            })
            return res.status(response.status).send(response)
        }

        const response = new ApiSuccess({
            status: STATUS.OK,
            message: SUCCESS.LOGIN,
            data: {
                username,
                isAdmin: true,
            },
        })
        return res.status(response.status).send(response)
    } catch (error) {
        const response = ApiError.internalServerError(error)
        return res.status(response.status).send(response)
    } finally {
        res.end()
    }
}

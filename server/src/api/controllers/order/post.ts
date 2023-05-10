import { ApiError, ApiSuccess, ERROR, STATUS, SUCCESS } from '@/api/responses'
import { validatePost } from '@/api/validators/order'
import { Notify } from '@/utils'

import type { RequestHandler } from 'express'

export const post: RequestHandler = (req, res) => {
    try {
        const { name, phone, order } = req.body

        if (!validatePost(req.body)) {
            const response = new ApiError({
                status: STATUS.BAD_REQUEST,
                message: ERROR.INVALID_DATA,
            })
            return res.status(response.status).send(response)
        }

        const notify = new Notify({ name, phone, order })
        void notify.send()

        const response = new ApiSuccess({
            status: STATUS.OK,
            message: SUCCESS.ORDER,
        })
        return res.status(response.status).send(response)
    } catch (error) {
        const response = ApiError.internalServerError(error)
        return res.status(response.status).send(response)
    } finally {
        res.end()
    }
}

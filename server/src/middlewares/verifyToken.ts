import { STATUS } from '@/api/responses'
import { WEBSITE_PATH } from '@/config'

import { type Middleware } from './types'

export const verifyToken: Middleware = (req, res, next) => {
    try {
        const token = req.headers.authorization

        if (token !== undefined) {
            next()
            return
        }

        res.status(STATUS.NOT_FOUND).sendFile(WEBSITE_PATH)
    } catch (error) {
        res.status(STATUS.UNAUTHORIZED)
    }
}

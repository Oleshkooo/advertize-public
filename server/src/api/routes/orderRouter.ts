import { Router } from 'express'

import { post } from '@/api/controllers/order'

const orderRouter: Router = Router()

orderRouter.post('/', post)

export { orderRouter }

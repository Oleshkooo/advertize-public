import { Router } from 'express'

import { del, get, post, put } from '@/api/controllers/data'

const dataRouter: Router = Router()

dataRouter.get('/', get)
dataRouter.post('/', post)
dataRouter.put('/', put)
dataRouter.delete('/', del)

export { dataRouter }

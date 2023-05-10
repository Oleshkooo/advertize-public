import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

import { type Express } from 'express'

import { dataRouter, loginRouter, orderRouter } from '@/api/routes'
import { API_PATH, CLIENT_DIR, CLIENT_PUBLIC_DIR, WEBSITE_PATH } from '@/config'
import { verifyToken } from '@/middlewares'
import { isProduction } from '@/utils'

const server: Express = express()

try {
    server.use(bodyParser.urlencoded({ extended: true }))
    server.use(bodyParser.json())
    server.use(compression())
    server.use(cors())
    server.use(
        helmet({
            contentSecurityPolicy: false,
        }),
    )

    server.use(express.static(CLIENT_DIR))
    server.use(express.static(CLIENT_PUBLIC_DIR))

    isProduction() && server.use('/api', verifyToken)

    server.use(`${API_PATH}/data`, dataRouter)
    server.use(`${API_PATH}/order`, orderRouter)
    server.use(`${API_PATH}/login`, loginRouter)

    server.get('*', (req, res) => {
        res.sendFile(WEBSITE_PATH)
    })

    console.log('[SERVER] Initialized')
} catch (error) {
    console.error(error)
}

export { server }

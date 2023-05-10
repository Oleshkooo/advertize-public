import path from 'path'

import { config } from 'dotenv'

const DEFAULT_ENV_FILE = '.env'
const NODE_ENV = process.env.NODE_ENV ?? 'production'

config({
    path: DEFAULT_ENV_FILE,
})
config({
    path: `${DEFAULT_ENV_FILE}.${NODE_ENV}`,
})

// global
export const PORT = process.env.PORT ?? 4000
export const WEBSITE_NAME = process.env.WEBSITE as string

// email
export const EMAIL_USER = process.env.EMAIL_USER as string
export const EMAIL_PASS = process.env.EMAIL_PASS as string

// telegram
export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN as string
export const TELEGRAM_DEV_ID = process.env.TELEGRAM_DEV_ID as string

// database
export const DB_USER = process.env.DB_USER as string
export const DB_PASS = process.env.DB_PASS as string
export const DB_NAME = process.env.DB_NAME as string
export const DB_CONNSTR = (() => {
    let connstr = process.env.DB_CONNSTR as string
    if (connstr.includes('<user>')) {
        connstr = connstr.replace('<user>', DB_USER)
    }
    if (connstr.includes('<pass>')) {
        connstr = connstr.replace('<pass>', DB_PASS)
    }
    if (connstr.includes('<db>')) {
        connstr = connstr.replace('<db>', DB_NAME)
    }
    return connstr
})()

// other
export const API_PATH = '/api'
export const CLIENT_DIR = path.join(__dirname, 'static', 'client')
export const CLIENT_PUBLIC_DIR = `${CLIENT_DIR}/public`
export const WEBSITE_PATH = `${CLIENT_DIR}/index.html`

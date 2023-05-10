import type { BotMiddleware } from '../types'

export const defaultMiddleware: BotMiddleware = (ctx, next) => {
    // console.log('ctx', ctx)
    void next()
}

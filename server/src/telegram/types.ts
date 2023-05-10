import type { Context, Middleware, MiddlewareFn } from 'telegraf'
import type { Update } from 'typegram'

// middlewares
export type BotMiddleware = MiddlewareFn<Context<Update>>

// commands
export type BotCommand = Middleware<Context>

import { type Context } from 'telegraf'
import { type Message } from 'typegram'

type GetCtxMessage = (ctx: Context) => string

export const getCtxMessage: GetCtxMessage = ctx => (ctx.message as Message.TextMessage).text

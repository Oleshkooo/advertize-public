import { Telegraf, Telegram, type Context } from 'telegraf'
import { type Update } from 'typegram'

import { TELEGRAM_BOT_TOKEN } from '@/config'
import { type ErrorType } from '@/types'

import { startCommand } from './commands'
import { defaultMiddleware } from './middlewares'

type Bot = Telegraf<Context<Update>>
interface SendMessageParams {
    chatId: number | string
    message: string
    params?: object
    errorCb?: (error: ErrorType) => void
}

export class TelegramBot {
    private static instance: TelegramBot | null = null
    private readonly bot: Bot = new Telegraf(TELEGRAM_BOT_TOKEN)

    constructor() {
        if (TelegramBot.instance === null) TelegramBot.instance = this
        else return TelegramBot.instance

        this.bot.catch(error => {
            console.error(error)
        })

        this.bot.use(defaultMiddleware)

        this.bot.start(startCommand)

        console.log('[BOT] Initialized')

        return TelegramBot.instance
    }

    public start = async () => {
        await this.bot.launch()
    }

    public async send(params: SendMessageParams) {
        const { chatId, message, params: otherParams, errorCb } = params
        const telegram: Telegram = new Telegram(TELEGRAM_BOT_TOKEN)

        try {
            await telegram.sendMessage(chatId, message, otherParams)
        } catch (error) {
            errorCb?.(error)
        }
    }
}

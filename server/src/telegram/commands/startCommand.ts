import { WEBSITE_NAME } from '@/config'

import type { BotCommand } from '../types'

export const startCommand: BotCommand = async ctx => {
    const name = ctx.from?.first_name ?? 'незнайомцю'

    await ctx.reply(`Привіт, *${name}*`, { parse_mode: 'Markdown' })
    await ctx.reply('Я - *бот* для отримання зворотнього зв’язку', { parse_mode: 'Markdown' })
    await ctx.reply(`Сюди будуть приходити повідомлення від клієнтів сайту ${WEBSITE_NAME}`)
}

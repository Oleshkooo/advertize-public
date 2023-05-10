import { listen } from '@/api/controllers/main'
import { PORT } from '@/config'
import { Database } from '@/database'
import { server } from '@/server'
import { TelegramBot } from '@/telegram'

const start = async () => {
    const database = new Database()
    const bot = new TelegramBot()

    void database.connect()
    void bot.start()
    server.listen(PORT, listen)
}

start().catch(error => {
    console.error(error)
})

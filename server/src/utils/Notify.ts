import { WEBSITE_NAME } from '@/config'
import { AdminsService, type IAdmin } from '@/database'
import { Email } from '@/email'
import { TelegramBot } from '@/telegram'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import { getCurrentDateString } from '@/utils/date'

interface ConstructorParams {
    name: string
    phone: string
    order: string
}
interface NotifyParams {
    admins: IAdmin[]
    date: string
    name: ConstructorParams['name']
    phone: ConstructorParams['phone']
    order: ConstructorParams['order']
}
type GetMessageParams = Omit<NotifyParams, 'admins'>

export class Notify {
    private readonly bot = new TelegramBot()
    private readonly email = new Email()
    private readonly admins = new AdminsService()
    private readonly date: NotifyParams['date']
    private readonly name: ConstructorParams['name']
    private readonly phone: ConstructorParams['phone']
    private readonly order: ConstructorParams['order']

    constructor({ name, phone, order }: ConstructorParams) {
        const date = getCurrentDateString()
        this.date = capitalizeFirstLetter(date)
        this.name = name
        this.phone = phone
        this.order = order
    }

    public async send() {
        const defaultParams = {
            date: this.date,
            name: this.name,
            phone: this.phone,
            order: this.order,
        }
        const admins = await this.admins.getAll()

        const telegramAdmins = admins.filter(item => item.isTelegramSubscribed)
        const emailAdmins = admins.filter(item => item.isEmailSubscribed)

        this.byTelegram({ admins: telegramAdmins, ...defaultParams })
        this.byEmail({ admins: emailAdmins, ...defaultParams })
    }

    private byTelegram({ admins, date, name, phone, order }: NotifyParams) {
        const message = this.getTelegramMessage({ date, name, phone, order })

        admins.forEach(admin => {
            void this.bot.send({
                chatId: admin.telegramId,
                message,
                params: { parse_mode: 'Markdown' },
            })
        })
    }

    private byEmail({ admins, date, name, phone, order }: NotifyParams) {
        const message = this.getEmailMessage({ date, name, phone, order })

        admins.forEach(admin => {
            this.email.send({
                subject: `${WEBSITE_NAME}: Нове замовлення від ${name}`,
                to: admin.email,
                html: message,
            })
        })
    }

    private getTelegramMessage({ date, name, phone, order }: GetMessageParams) {
        const message = []

        message.push(`🗓 ${date}`)
        message.push(`👤 Ім'я: *${name}*`)
        message.push(`📞 Номер телефону: ${phone}`)
        message.push(`💬 Завомлення: *${order}*`)

        return message.join('\n\n')
    }

    private getEmailMessage({ date, name, phone, order }: GetMessageParams) {
        return `
            <h3 style="padding-bottom: 20px;">🎁 ${name} зробив(-ла) замовлення на сайті ${WEBSITE_NAME}</h3>
            <p>🗓 <strong>${date}</strong></p>
            <p><strong>👤 Ім'я: </strong> ${name}</p>
            <p><strong>📞 Номер телефону: </strong> ${phone}</p>
            <p style="padding-bottom: 30px;"><strong>💬 Завомлення: </strong> ${order}</p>
            <a
                href="tel:${phone}"
                style="
                    padding: 12px 24px;
                    background: #2283c3;
                    border: none;
                    border-radius: 25px;
                    color: #ecf0f1;
                    cursor: pointer;
                    outline: none;
                    text-decoration: none;
                "
            >
                Подзвонити
            </a>
            <div style="width: 10px; height: 10px;"></div>
        `
    }
}

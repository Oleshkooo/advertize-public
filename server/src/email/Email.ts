import { createTransport } from 'nodemailer'

import { EMAIL_PASS, EMAIL_USER } from '@/config'

interface SendEmailOptions {
    to: string
    subject: string
    html: string
}

export class Email {
    private readonly emailTransport = createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
    })

    private readonly emailOptions = {
        from: EMAIL_USER,
    }

    public send(options: SendEmailOptions) {
        const joinedEmailOptions = {
            ...this.emailOptions,
            ...options,
        }

        this.emailTransport.sendMail(joinedEmailOptions, (error, data) => {
            error !== null && console.error(error)
        })
    }
}

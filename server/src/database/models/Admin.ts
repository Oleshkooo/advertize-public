import { Schema, model, models } from 'mongoose'

import type { IAdmin } from './types'

const AdminSchema = new Schema<IAdmin>({
    username: {
        type: String,
        required: [true, 'Name is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    isEmailSubscribed: {
        type: Boolean,
        required: [true, 'Email subscribtion is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: (v: string) => {
                const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
                if (!regex.test(v)) return false
                return true
            },
        },
    },
    isTelegramSubscribed: {
        type: Boolean,
        required: [true, 'Telegram subscribtion is required'],
    },
    telegramId: {
        type: Schema.Types.Mixed,
        required: [true, 'Telegram ID is required'],
        validate: {
            validator: (v: any) => typeof v === 'string' || typeof v === 'number',
        },
    },
})

AdminSchema.methods.isPasswordCorrect = async function (password: string) {
    return this.password === password
}

export const AdminModel = models.admin ?? model('admin', AdminSchema)

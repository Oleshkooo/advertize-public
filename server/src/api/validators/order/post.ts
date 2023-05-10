import type { Validator } from '../types'

const phoneRegExp =
    /^(?:\+?\d{1,3}\s?)?(?:\(\d{1,4}\)|\d{1,4})[-.\s]?\d{1,3}[-.\s]?\d{1,3}[-.\s]?\d{2,3}$/

export const validatePost: Validator = data => {
    const { name, phone, order } = data

    if (typeof name !== 'string' || typeof phone !== 'string' || typeof order !== 'string') {
        return false
    }

    if (name.length < 2 || !phoneRegExp.test(phone) || order.length < 2) {
        return false
    }

    return true
}

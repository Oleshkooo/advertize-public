import type { Validator } from '../types'

export const validatePost: Validator = data => {
    const { username, password } = data

    if (typeof username !== 'string' || typeof password !== 'string') {
        return false
    }

    return true
}

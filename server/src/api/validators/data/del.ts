import type { Validator } from '../types'

export const validateDelete: Validator = data => {
    const { _id } = data

    if (typeof _id === 'undefined') {
        return false
    }

    return true
}

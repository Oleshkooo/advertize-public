import type { Validator } from '../types'

export const validatePut: Validator = data => {
    if (typeof data !== 'object' || typeof data._id === 'undefined') {
        return false
    }

    return true
}

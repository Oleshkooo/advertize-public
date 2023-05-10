import type { Validator } from '../types'

export const validatePost: Validator = data => {
    const { type, lat, lng, sides } = data

    if (
        typeof type !== 'string' ||
        typeof lat !== 'number' ||
        typeof lng !== 'number' ||
        !Array.isArray(sides)
    ) {
        return false
    }

    return true
}

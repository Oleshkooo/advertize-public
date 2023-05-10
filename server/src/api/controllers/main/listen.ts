import { PORT } from '@/config'
import { getCurrentTimeString } from '@/utils'

export const listen = () => {
    try {
        console.log(`[SERVER] | ${getCurrentTimeString()} Listening at ${PORT}`)
    } catch (error) {
        console.error(error)
    }
}

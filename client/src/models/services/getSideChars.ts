import { type IAdspace } from '../billboardModel'

type GetSideChart = (type: IAdspace['type']) => string[]

export const getSideChars: GetSideChart = type => {
    if (type === 'arka') {
        return ['A', 'A']
    } else if (type === 'billboard') {
        return ['A', 'B']
    } else if (type === 'oneside') {
        return ['A']
    } else if (type === 'duplex') {
        return ['A', 'B', 'C', 'D']
    } else {
        return []
    }
}

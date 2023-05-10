import { type IAdspace } from '@/models/billboardModel'

import { getSideChars } from './getSideChars'

type GetAdspaceInfo = (data: IAdspace) => {
    type: 'Арка' | 'Білборд'
    chars: string[]
}

export const getAdspaceInfo: GetAdspaceInfo = data => {
    const { type } = data

    return {
        type: type === 'billboard' ? 'Білборд' : 'Арка',
        chars: getSideChars(type),
    }
}

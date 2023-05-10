import { type IAdspaceSide } from '@/database/models'

type CheckExpire = (item: IAdspaceSide) => [IAdspaceSide, boolean]

export const checkExpire: CheckExpire = side => {
    side.expireDate = side.expireDate.trim()

    let updateFlag = false
    const hasDate = side.expireDate.length !== 0
    const isBusy = side.isBusy

    if (hasDate) {
        const isExpired = new Date() > new Date(side.expireDate)
        if (isExpired) {
            side.expireDate = ''
            side.isBusy = false
            updateFlag = true
        } else if (!isBusy) {
            side.isBusy = true
            updateFlag = true
        }
    } else if (isBusy) {
        side.isBusy = false
        updateFlag = true
    }

    return [side, updateFlag]
}

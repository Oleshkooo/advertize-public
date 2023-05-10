import { AdspaceModel, type IAdspace } from '@/database/models'
import { range } from '@/utils'

export type GetBillboards = () => IAdspace[] | Promise<IAdspace[]>
export type GetMaxBillboardId = () => number | Promise<number>

export class AdspaceService {
    public async getAll(): Promise<IAdspace[]> {
        try {
            const adcpace: IAdspace[] = await AdspaceModel.find().lean()
            return adcpace
        } catch (error) {
            console.error(error)
            return [] as IAdspace[]
        }
    }

    public async getMaxId(): Promise<number> {
        try {
            const adspace: IAdspace[] = await AdspaceModel.find().sort({ id: -1 }).limit(1).lean()

            if (adspace.length === 0) return 0
            return adspace[0].id
        } catch (error) {
            console.error(error)
            return 0
        }
    }

    public getMaxSidesLength(type: string): number {
        switch (type) {
            case 'billboard':
                return 2
            case 'arka':
                return 2
            case 'oneside':
                return 1
            case 'duplex':
                return 4
            default:
                return 0
        }
    }

    public normalizeSides(adspace: IAdspace): IAdspace {
        const maxSidesLength = this.getMaxSidesLength(adspace.type)
        const emptySide = {
            text: '',
            image: '',
            isBusy: false,
            expireDate: '',
        }

        // add
        if (adspace.sides.length < maxSidesLength) {
            const sidesToAdd = maxSidesLength - adspace.sides.length
            range(sidesToAdd, () => {
                adspace.sides.push(emptySide)
            })
        }

        // remove
        if (adspace.sides.length > maxSidesLength) {
            adspace.sides = adspace.sides.slice(0, maxSidesLength)
        }

        return adspace
    }
}

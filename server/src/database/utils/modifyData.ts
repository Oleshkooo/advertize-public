import { type Callback } from 'mongoose'

import { AdspaceModel, type IAdspace, type IAdspaceSide } from '../models'

import { checkExpire } from './checkExpire'

type ModifySide = (item: IAdspaceSide) => [IAdspaceSide, boolean]
type ModifyData = (item: IAdspace[]) => IAdspace[]
type ModifyDataCallback = Callback<IAdspace>

const modifySide: ModifySide = side => {
    const funcs = [checkExpire]
    let updateFlag = false

    for (const func of funcs) {
        const [newSide, flag] = func(side)
        side = newSide
        updateFlag = updateFlag || flag
    }

    return [side, updateFlag]
}

export const modifyData: ModifyData = adspaceArr => {
    return adspaceArr.map(adspace => {
        let updateFlag = false

        adspace.sides = adspace.sides.map(side => {
            const [newSide, flag] = modifySide(side)
            side = newSide
            updateFlag = updateFlag || flag
            return side
        })

        if (updateFlag) {
            const cb: ModifyDataCallback = (error, result) => {
                error !== null && console.error(error)
            }

            void AdspaceModel.updateOne({ _id: adspace._id }, { sides: adspace.sides }, cb)
        }

        return adspace
    })
}

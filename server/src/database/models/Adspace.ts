import { model, models, Schema } from 'mongoose'

import type { IAdspace, IAdspaceSide } from './types'

const AdspaceSideSchema = new Schema<IAdspaceSide>({
    text: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: '',
    },
    isBusy: {
        type: Boolean,
        default: false,
    },
    expireDate: {
        type: String,
        default: '',
    },
})

const AdspaceSchema = new Schema<IAdspace>({
    id: {
        type: Number,
        required: [true, 'ID is required'],
        unique: true,
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
        enum: ['billboard', 'arka', 'oneside', 'duplex'],
        message: 'Type must be "billboard", "arka" or "oneside"',
    },
    lat: {
        type: Number,
        required: [true, 'Latitude is required'],
        min: -90,
        max: 90,
    },
    lng: {
        type: Number,
        required: [true, 'Longitude is required'],
        min: -180,
        max: 180,
    },
    sides: {
        type: [AdspaceSideSchema],
        default: [] as IAdspaceSide[],
    },
})

export const AdspaceModel = models.adspace ?? model('adspace', AdspaceSchema)

export interface IAdspaceSide extends JSX.IntrinsicAttributes {
    [key: string]: any
    _id: string
    text: string
    image: string
    isBusy: boolean
    expireDate: string
}

export interface IAdspace extends JSX.IntrinsicAttributes {
    [key: string]: any
    _id: string
    id: number
    type: 'billboard' | 'arka' | 'oneside' | 'duplex'
    lat: number
    lng: number
    sides: IAdspaceSide[]
}

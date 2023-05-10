// adspace
export interface IAdspaceSide {
    text: string
    image: string
    isBusy: boolean
    expireDate: string
}

export interface IAdspace {
    _id: string
    id: number
    type: 'billboard' | 'arka' | 'oneside' | 'duplex'
    lat: number
    lng: number
    sides: IAdspaceSide[]
}

// admin
export interface IAdmin {
    username: string
    password: string
    isEmailSubscribed: boolean
    email: string
    isTelegramSubscribed: boolean
    telegramId: string | number

    isPasswordCorrect: (password: string) => boolean | Promise<boolean>
}

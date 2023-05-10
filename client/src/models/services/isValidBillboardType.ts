type IsValidBillboardType = (value: string) => boolean

export const isValidBillboardType: IsValidBillboardType = value =>
    ['billboard', 'arka', 'oneside', 'duplex'].includes(value)

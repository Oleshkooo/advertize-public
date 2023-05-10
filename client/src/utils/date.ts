type NormalizeDate = (date: string) => string

export const normalizeDate: NormalizeDate = date => {
    const [year, month, day] = date.split('-')
    return `${day}.${month}.${year}`
}

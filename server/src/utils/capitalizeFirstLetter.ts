type CapitalizeFirstLetter = (string: string) => string

export const capitalizeFirstLetter: CapitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

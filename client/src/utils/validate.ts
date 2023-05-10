type ValidateType = (value: string) => boolean

const phoneRegExp =
    /^(?:\+?\d{1,3}\s?)?(?:\(\d{1,4}\)|\d{1,4})[-.\s]?\d{1,3}[-.\s]?\d{1,3}[-.\s]?\d{2,3}$/

export const validatePhone: ValidateType = phone => phoneRegExp.test(phone)

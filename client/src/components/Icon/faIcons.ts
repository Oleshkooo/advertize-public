// export const UserIcon = 'fa-regular fa-user'
// export const PhoneIcon = 'fa-regular fa-phone'
// export const SearchIcon = 'fa-regular fa-magnifying-glass'
// export const PasswordIcon = 'fa-regular fa-lock'
// export const ArrowIcon = 'fa-light fa-arrow-up-right'
// export const InstagramIcon = 'fa-brands fa-instagram'
// export const TelegramIcon = 'fa-brands fa-telegram'
// export const FacebookIcon = 'fa-brands fa-facebook'
// export const ViberIcon = 'fa-brands fa-viber'
// export const WebsiteIcon = 'fa-regular fa-globe'
// export const EnvelopeIcon = 'fa-regular fa-envelope'

import { type IconProps } from './Icon.data'

const User: IconProps = {
    type: 'fa-user',
    className: 'fa-regular fa-user',
}
const Phone: IconProps = {
    type: 'fa-phone',
    className: 'fa-regular fa-phone',
}
const Search: IconProps = {
    type: 'fa-search',
    className: 'fa-regular fa-magnifying-glass',
}
const Password: IconProps = {
    type: 'fa-password',
    className: 'fa-regular fa-lock',
}
const Arrow: IconProps = {
    type: 'fa-arrow',
    className: 'fa-light fa-arrow-up-right',
}
const Instagram: IconProps = {
    type: 'fa-instagram',
    className: 'fa-brands fa-instagram',
}
const Telegram: IconProps = {
    type: 'fa-telegram',
    className: 'fa-brands fa-telegram',
}
const Facebook: IconProps = {
    type: 'fa-facebook',
    className: 'fa-brands fa-facebook',
}
const Viber: IconProps = {
    type: 'fa-viber',
    className: 'fa-brands fa-viber',
}
const Website: IconProps = {
    type: 'fa-website',
    className: 'fa-regular fa-globe',
}
const Envelope: IconProps = {
    type: 'fa-envelope',
    className: 'fa-regular fa-envelope',
}

export const faIcons = [
    User,
    Phone,
    Search,
    Password,
    Arrow,
    Instagram,
    Telegram,
    Facebook,
    Viber,
    Website,
    Envelope,
]
export type FaIcon =
    | 'fa-user'
    | 'fa-phone'
    | 'fa-search'
    | 'fa-password'
    | 'fa-arrow'
    | 'fa-instagram'
    | 'fa-telegram'
    | 'fa-facebook'
    | 'fa-viber'
    | 'fa-website'
    | 'fa-envelope'

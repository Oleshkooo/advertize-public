import { faIcons, type FaIcon } from './faIcons'
import { myIcons, type MyIcon } from './myIcons'

export interface IconProps {
    type: string
    width?: number
    height?: number
    alt?: string
    src?: string
    className?: string
}

export const icons = [...myIcons, ...faIcons]
export type IconType = MyIcon | FaIcon

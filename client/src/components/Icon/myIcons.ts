import svgLogo from '@/assets/logo.svg'
import svgSpeaker from '@/assets/speaker.svg'
import svgTarget from '@/assets/target.svg'

import { type IconProps } from './Icon.data'

const defaultProps = {
    width: 150,
    height: 150,
    alt: 'icon',
}

export const Logo: IconProps = {
    type: 'logo',
    width: 154,
    height: 28,
    alt: 'Advertize',
    src: svgLogo,
}
export const Speaker: IconProps = {
    type: 'speaker',
    ...defaultProps,
    src: svgSpeaker,
}
export const Target: IconProps = {
    type: 'target',
    ...defaultProps,
    src: svgTarget,
}

export const myIcons = [Logo, Speaker, Target]
export type MyIcon = 'logo' | 'speaker' | 'target'

import s from './Menu.module.scss'

const scssVars = {
    gap: parseFloat(s.gap),
    height: parseFloat(s.height),
    scale: parseFloat(s.scale),
}
const translateValue = scssVars.gap * 2 + scssVars.height / 2 - 0.5

export const buttonAnimation = {
    hover: {
        scale: 1 + scssVars.scale,
    },
    click: {
        scale: 1 - scssVars.scale,
    },
    topLine: {
        open: { transform: `rotate(-45deg) translateY(${translateValue}px)` },
        close: { transform: 'rotate(0deg) translateY(0px)' },
    },
    middleLine: {
        open: { transform: 'translateX(80%)', opacity: 0 },
        close: { transform: 'translateX(0%)', opacity: 1 },
    },
    bottomLine: {
        open: { transform: `rotate(45deg) translateY(-${translateValue}px)` },
        close: { transform: 'rotate(0deg) translateY(0px)' },
    },
}
export const containerAnimation = {
    open: {
        transform: 'translateX(-25%)',
    },
    close: {
        transform: 'translateX(0%)',
    },
}
export const transition = {
    type: 'spring',
    stiffness: 100,
    damping: 15,
}

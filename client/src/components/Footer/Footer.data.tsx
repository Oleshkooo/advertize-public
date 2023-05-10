import { Icon } from '@/components/Icon'

interface Link {
    text: string
    link: string
    icon?: JSX.Element
    position?: 'left' | 'right'
}
interface LinksGrop {
    title: string
    links: Link[]
}

const companyLinks: Link[] = [
    {
        text: 'Головна',
        link: '/',
        icon: <Icon type="fa-arrow" />,
        position: 'right',
    },
    {
        text: 'Замовити рекламу',
        link: '/order',
        icon: <Icon type="fa-arrow" />,
        position: 'right',
    },
    {
        text: 'Політика конфіденційності',
        link: '/terms-of-use',
        icon: <Icon type="fa-arrow" />,
        position: 'right',
    },
    {
        text: 'Умови використання',
        link: '/privacy-policy',
        icon: <Icon type="fa-arrow" />,
        position: 'right',
    },
]
const socialLinks: Link[] = [
    {
        text: 'Instagram',
        link: 'https://www.instagram.com/bravoreklama/',
        icon: <Icon type="fa-instagram" />,
        position: 'left',
    },
    {
        text: 'Facebook',
        link: 'https://www.facebook.com/Bravo.co.ua',
        icon: <Icon type="fa-facebook" />,
        position: 'left',
    },
    {
        text: 'Website',
        link: 'https://bravoboard.lviv.ua',
        icon: <Icon type="fa-website" />,
        position: 'left',
    },
]
const contactsLinks: Link[] = [
    {
        text: '+380 (98) 435 66 17',
        link: 'tel:+380984356617',
        icon: <Icon type="fa-phone" />,
        position: 'left',
    },
    {
        text: '+380 (63) 183 87 14',
        link: 'tel:+380631838714',
        icon: <Icon type="fa-phone" />,
        position: 'left',
    },
    {
        text: 'khoma.viktor@gmail.com',
        link: 'mailto:khoma.viktor@gmail.com',
        icon: <Icon type="fa-envelope" />,
        position: 'left',
    },
]
const designLinks: Link[] = [
    {
        text: '+380 (67) 287 91 80',
        link: 'tel:+380672879180',
        icon: <Icon type="fa-phone" />,
        position: 'left',
    },
    {
        text: 'dev.oleh.khoma@gmail.com',
        link: 'mailto:dev.oleh.khoma@gmail.com',
        icon: <Icon type="fa-envelope" />,
        position: 'left',
    },
    {
        text: 'Telegram',
        link: 'https://t.me/oleshkooo',
        icon: <Icon type="fa-telegram" />,
        position: 'left',
    },
    {
        text: 'Viber',
        link: 'viber://chat?number=+380672879180',
        icon: <Icon type="fa-viber" />,
        position: 'left',
    },
]

export const currentYear = new Date().getFullYear()
export const footerLinks: LinksGrop[] = [
    {
        title: 'Компанія',
        links: companyLinks,
    },
    {
        title: 'Контакти',
        links: contactsLinks,
    },
    {
        title: 'Дизайнер',
        links: designLinks,
    },
    {
        title: 'Соцмережі',
        links: socialLinks,
    },
]

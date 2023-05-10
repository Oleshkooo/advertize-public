// ? global
export const SERVER = import.meta.env.VITE_SERVER as string
export const JWT_TOKEN = import.meta.env.VITE_JWT_TOKEN as string

// ? mapbox
export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string
export const MAPBOX_STYLE = import.meta.env.VITE_MAPBOX_STYLE as string

// ? google analytics
export const GA_TRACKING_ID_OLD = import.meta.env.VITE_GA_TRACKING_ID as string

// ? other
export const ERROR_OCCURRED_MESSAGE = 'Виникла помилка' as string
export const HIDDEN_LINKS = ['/adm', '/adm-login', '/api'] as string[]
export const DEFAULT_TITLE = 'Advertize — Реклама у Львові і не тільки!' as string

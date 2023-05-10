type IsNodeEnv = () => boolean

export const isProduction: IsNodeEnv = () => process.env.NODE_ENV === 'production'
export const isDevelopment: IsNodeEnv = () => process.env.NODE_ENV === 'development'

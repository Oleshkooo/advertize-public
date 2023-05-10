type IsNodeEnv = () => boolean

export const isDevelopment: IsNodeEnv = () => process.env.NODE_ENV === 'development'
export const isProduction: IsNodeEnv = () => process.env.NODE_ENV === 'production'

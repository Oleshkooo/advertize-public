import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'

import { JWT_TOKEN, SERVER } from '@/config'

export const baseQuery = fetchBaseQuery({
    baseUrl: `${SERVER ?? ''}/api`,
    prepareHeaders: headers => {
        if (JWT_TOKEN !== undefined) {
            headers.set('Authorization', JWT_TOKEN)
        }
        return headers
    },
})

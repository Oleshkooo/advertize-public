import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { type IAdspace, type IAdspaceSide } from '@/models'

import { baseQuery } from './config'
import { type ApiResponse } from './types'

interface DataPost {
    type: IAdspace['type']
    lat: IAdspace['lat']
    lng: IAdspace['lng']
    sides?: IAdspaceSide[]
}
interface DataDelete {
    _id: IAdspace['_id']
}

export const mapApi = createApi({
    reducerPath: 'map',
    tagTypes: ['Map'],
    keepUnusedDataFor: 0,
    baseQuery,
    endpoints: builder => ({
        getMarkers: builder.query<ApiResponse<IAdspace[]>, void>({
            query: () => '/data',
            providesTags: ['Map'],
        }),
        createMarker: builder.mutation<ApiResponse, DataPost>({
            query: body => ({
                url: '/data',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Map'],
        }),
        updateMarker: builder.mutation<ApiResponse, IAdspace>({
            query: body => ({
                url: '/data',
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Map'],
        }),
        deleteMarker: builder.mutation<ApiResponse, DataDelete>({
            query: _id => ({
                url: '/data',
                method: 'DELETE',
                body: {
                    _id,
                },
            }),
            invalidatesTags: ['Map'],
        }),
    }),
})

export const {
    useGetMarkersQuery,
    useCreateMarkerMutation,
    useUpdateMarkerMutation,
    useDeleteMarkerMutation,
} = mapApi

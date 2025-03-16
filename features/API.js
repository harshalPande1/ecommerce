import {createApi} from '@reduxjs/toolkit/query/react'
import { customFetchQuery } from './CustomBaseQuery'

const API = createApi({
    reducerPath : 'api',
    baseQuery : customFetchQuery,
    endpoints: () => ({}),
    tagTypes : ['']
})

export default API
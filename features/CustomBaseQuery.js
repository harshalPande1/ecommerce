import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const customFetchQuery = fetchBaseQuery({
    baseUrl : 'https://api.escuelajs.co/api/v1'
})
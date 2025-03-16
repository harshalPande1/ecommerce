import API from "../API";


export const productsAPI = API.injectEndpoints({
    endpoints : (builder => ({
        getProducts : builder.query({
            query : (body)=>({
                url : `/products?${body?.title}`,
                method : `get`,
            })
        }),
        getCategories : builder.query({
            query : (body)=>({
                url : `/categories`,
                method : `get`,
            })
        }),
        getProductNyCategorie : builder.query({
            query : (id)=>({
                url : `/categories/${id}/products`,
                method : `get`,
            })
        })
    }))
})

export const {useLazyGetProductsQuery , useGetCategoriesQuery , useLazyGetCategoriesQuery} = productsAPI
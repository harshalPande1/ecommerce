import API from "../API";


const authAPI = API.injectEndpoints({
    endpoints : (builder => ({
        Register : builder.mutation({
            query : (body)=>({
                url : ``,
                method : `post`,
                body : body
            })
        })
    }))
})

export const {useRegisterMutation} = authAPI
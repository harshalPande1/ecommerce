export const getTotal = (items , carts , user)=>{
    return items.reduce((acc,it)=>{
        return acc = acc+  (carts[user?.payload?.uid][it]?.price *carts[user?.payload?.uid][it]?.qty)
        
    },0)
}
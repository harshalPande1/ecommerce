import React, { useState } from "react";

const useFormHook = (init) => {
    const [form , setForm] = useState(init);
    const inputHandler = (e) =>{
        try {
            setForm((prev)=>{
                return {
                    ...prev,
                    [e.target.name] : e.target.value
                }
            })           
        } catch (error) {
            console.log("inputHandler error",error);
        }
    }
  return {form , inputHandler}
};

export default useFormHook;

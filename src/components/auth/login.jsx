import React, { useState } from "react";
import useFormHook from "../../hooks/formHook";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../fireBase";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import Loader from "../Loader";
const Login = () => {
    const { form, inputHandler } = useFormHook({});
    const [loading , setLoading] = useState(false)
    let navigate = useNavigate();
    const submitHandler = async (e) => {
        try {
            e.preventDefault();
            const user = await signInWithEmailAndPassword(auth, form.emailId, form.password)
            console.log('login', user?.user?.uid)
            if (user?.user?.uid) {
                toast.success('user login')
                setTimeout(() => {
                    setLoading(false)
                    navigate('/')
                }, 1000)
            }else{
                setLoading(true)
            }
        } catch (error) {
            console.log("login error", error);

        }
    }
    if(loading) return <Loader /> 
    return <div className="container">
        <div className="row justify-content-between align-self-center">
            <form onSubmit={submitHandler}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={form?.emailId} name="emailId" onChange={inputHandler} required />
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" value={form?.password} name="password" onChange={inputHandler} required />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>;
        <ToastContainer />
    </div>;
};

export default Login;

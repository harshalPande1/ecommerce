import React from "react";
import useFormHook from "../../hooks/formHook";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../fireBase";
import { setDoc, doc } from "firebase/firestore";
const Register = () => {
    const { form, inputHandler } = useFormHook({});
    const submitHandler = async (e) => {
        try {
            e.preventDefault();
            console.log("form", form);
            await createUserWithEmailAndPassword(auth, form?.emailId, form?.password);
            const user = auth.currentUser;
            console.log("user", user);
            if (user) {
                await setDoc(doc(db, 'users', user?.uid), {
                    emailId: user?.email,
                    name: form?.name,
                    mobile: form?.mobile
                })
            }
        } catch (error) {
            console.log(error);

        }

    }
    return <div className="container">
        <form onSubmit={submitHandler}>
            <div>
                <label className="form-label" htmlFor="name">Full Name</label>
                <input className="form-control" type="text" id="name" value={form?.name} name="name" onChange={inputHandler} required />
            </div>
            <div>
                <label className="form-label" htmlFor="mobile">Mobile</label>
                <input className="form-control" type="text" id="mobile" value={form?.mobile} name="mobile" onChange={inputHandler} required />
            </div>
            <div>
                <label className="form-label" htmlFor="emailId">EmailI Id</label>
                <input className="form-control" type="email" id="emailId" value={form?.emailId} name="emailId" onChange={inputHandler} required />
            </div>
            <div>
                <label className="form-label" htmlFor="password">Password</label>
                <input className="form-control" type="password" id="password" value={form?.password} name="password" onChange={inputHandler} required />
            </div>
            <div className="w-100 text-center my-2">
                <button className="btn btn-primary " type="submit">Register</button>
            </div>
        </form>
    </div>;
};

export default Register;

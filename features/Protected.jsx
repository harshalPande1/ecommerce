import React, { useEffect } from 'react';
import { auth } from '../src/components/fireBase';
import { useDispatch } from 'react-redux';
import { addAuthUser } from './auth/authSlice';


const withAuth = (WrappedComponent) => {
    const Wrapper = (props) => {   
        const dispatch = useDispatch()   
        useEffect(() => {
                        auth.onAuthStateChanged(user => {
                            console.log("user", user);
                            dispatch(addAuthUser(user))
            
                        })
                    }, [])
        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default withAuth;


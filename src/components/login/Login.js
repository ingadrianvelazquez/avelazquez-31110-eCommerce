import React, { useEffect, useState, useContext } from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { CartContext } from '../../context/CartContext';
import { Navigate } from "react-router-dom";
import userDefault from '../../helper/Constants.js';
import Loading from '../loading/Loading';

const Login = ({ actionLogin, from }) => {
    const { buyerInfo, setBuyerInfo } = useContext(CartContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (actionLogin === 'out') {
            setBuyerInfo(userDefault)
            setLoading(false)
        }

        if (actionLogin === 'in' && buyerInfo.name === '') {
            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            const loginWithGoogle = async () => {
                await signInWithPopup(auth, provider)
                    .then((result) => {
                        const guser = result.user;
                        setBuyerInfo({
                            name: guser.displayName,
                            phone: guser.phoneNumber,
                            email: guser.email,
                            confirm_email: guser.email,
                            photoURL: guser.photoURL,
                        })
                    }).catch((error) => {
                        console.log('login error: ', error);
                    }).finally(() => {
                        setLoading(false)
                    });
            }
            loginWithGoogle();
        }
    }, [actionLogin])

    return loading ? (
        <Loading />
    ) : (<Navigate to={from !== undefined ? from : '/home'} />);

}

export default Login
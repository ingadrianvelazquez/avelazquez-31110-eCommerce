import React, { useEffect, useState } from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {

    const [user, setUser] = useState({
        displayName: '',
        email: '',
        phoneNumber: '',
        photoURL: '',
    })


    useEffect(() => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);

                console.log('credential', credential)

                const token = credential.accessToken;
                console.log('token', token)

                // The signed-in user info.
                const guser = result.user;
                console.log('user', guser)

                setUser({
                    displayName: guser.displayName,
                    email: guser.email,
                    phoneNumber: guser.phoneNumber,
                    photoURL: guser.photoURL,
                })
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                console.log('errorCode', errorCode)

                const errorMessage = error.message;
                console.log('errorMessage', errorMessage)

                // The email of the user's account used.
                const email = error.email;
                console.log('email', email)

                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log('credential', credential)
                // ...
            });
    }, [])



    return <div>
        {user.displayName !== '' ?
            <div>
                <p>nombre : {user.displayName}</p>
                <p>email: {user.email}</p>
                <p>telefono: {user.phoneNumber}</p>
                <img src={user.photoURL} alt={user.displayName} title={user.displayName} />
            </div>
            : <p>ESPERANDO...</p>}
    </div>

}

export default Login
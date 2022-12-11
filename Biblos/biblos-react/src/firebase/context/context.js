import React, { useContext, useEffect, useState } from "react";
import { auth, db, storage } from "../config/config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';

const FireBaseContext = React.createContext();

export function useFireContext() {
    return useContext(FireBaseContext);
}

export function FirebaseProvider({ children }) {
    const [currUser, setCurrUser] = useState();
    const provider = new GoogleAuthProvider();
    const [logged, setLogged] = useState(false);

    function SignUp(email, pwd) {
        return createUserWithEmailAndPassword(auth, email, pwd);
    }

    function SignIn(email, pwd) {
        return signInWithEmailAndPassword(auth, email, pwd);
    }

    function SignInWithGoogle() {
        return signInWithPopup(auth, provider);
    }

    function SignOut() {
        signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrUser(user);
        })
        return unsubscribe;
    }, []);

    const value = {
        SignIn,
        SignInWithGoogle,
        SignOut,
        SignUp,
        logged,
        setLogged,
        currUser,
        setCurrUser
    };

    return (
        <FireBaseContext.Provider value={value}>
            {children}
        </FireBaseContext.Provider>
    )
}


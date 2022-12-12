import React, { useContext, useEffect, useState } from "react";
import { auth, db, storage } from "../config/config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';

const FireBaseContext = React.createContext();

export function useFireContext() {
    return useContext(FireBaseContext);
}

export function FirebaseProvider({ children }) {
    const [currUser, setCurrUser] = useState();
    const usersCol = collection(db, 'users');

    async function SignUp(email, pwd, name) {
        let newUserCredentials = createUserWithEmailAndPassword(auth, email, pwd);
        if (newUserCredentials) {
            await addDoc(usersCol, {
                admin: false,
                email: email,
                name: name
            });
        }
        return newUserCredentials;
    }

    function SignIn(email, pwd) {
        return signInWithEmailAndPassword(auth, email, pwd);
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
        SignOut,
        SignUp,
        currUser,
        setCurrUser
    };

    return (
        <FireBaseContext.Provider value={value}>
            {children}
        </FireBaseContext.Provider>
    )
}


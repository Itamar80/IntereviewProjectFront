export const signIn = creds => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            creds.email,
            creds.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS', isLoggedIn: true })
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err })
        })
    }
}

export const signInWithFacebook = user => {
    return (dispatch) => {
        dispatch({ type: 'LOGIN_FACEBOOK_SUCCESS', isLoggedIn: true, user: user.email })
    }
}
export const signInWithGoogle = user => {
    return (dispatch) => {
        dispatch({ type: 'LOGIN_GOOGLE_SUCCESS', isLoggedIn: true, user: user.email })
    }
}
export const resetAuthError = () => {
    return (dispatch) => {
        dispatch({ type: 'RESET_AUTHERROR', authError: null })
    }
}


export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signOut()
            .then(() => {
                dispatch({ type: 'SIGNOUT_SUCCESS', isLoggedIn: false })
            })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((res) => {
            return firestore.collection('users').doc(res.user.uid).set({
                email: newUser.email,
                password: newUser.password,
                name: newUser.name
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS', isLoggedIn: true })
        }).catch(err => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
    }
}
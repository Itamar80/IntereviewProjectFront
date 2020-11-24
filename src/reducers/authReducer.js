const INITIAL_STATE = {
    isLoggedIn: false,
    authError: null,
    loggedInSocialUser: null,
    userName: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log('Login Error', action.err);
            return {
                ...state,
                authError: action.err.message
            }
        case 'LOGIN_SUCCESS':
            console.log('Login Success', state.isLoggedIn, action.email);
            return {
                ...state, authError: null,
                isLoggedIn: action.isLoggedIn,
                userName: action.email.substring(0, action.email.indexOf('@'))
            }
        case 'SIGNOUT_SUCCESS':
            console.log('Signout success');
            return { ...state, isLoggedIn: action.isLoggedIn }
        case 'SIGNUP_SUCCESS':
            console.log('signup success');
            return {
                ...state,
                authError: null,
                isLoggedIn: action.isLoggedIn
            }
        case 'SIGNUP_ERROR':
            console.log('signup error');
            return {
                ...state,
                authError: action.err.message
            }
        case 'LOGIN_FACEBOOK_SUCCESS':
            console.log('facebook signin success');
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
                loggedInSocialUser: action.user,
                userName: action.userName
            }
        case 'LOGIN_GOOGLE_SUCCESS':
            console.log('Google signin success');
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
                loggedInSocialUser: action.user,
                userName: action.userName
            }
        case 'RESET_AUTHERROR':
            console.log('reset auth error');
            return {
                ...state,
                authError: action.authError
            }
        default:
            return state;
    }
}
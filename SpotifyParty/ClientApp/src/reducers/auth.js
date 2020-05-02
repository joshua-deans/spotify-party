
const initialState = {
    spotifyCode: null,
    accessToken: null,
    isAuthLoaded: false,
    isLoggedIn: false, 
    user: null
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                ...state,
                spotifyCode: action.spotifyCode
            }
        case 'GET_ACCESS_TOKEN':
            return {
                ...state,
                accessToken: action.accessToken
            }
        case 'LOGOUT_USER':
            return {
                spotifyCode: null,
                accessToken: null, 
                isLoggedIn: false, 
                user: null,
                isAuthLoaded: true
            }
        case 'VERIFY_LOGIN':
            return {
                ...state, 
                isLoggedIn: true, 
                user: action.user,
                isAuthLoaded: true
            }
        case 'AUTH_FINISHED':
            return {
                ...state, 
                isAuthLoaded: true
            }
        default:
            return state
    }
}

export default auth
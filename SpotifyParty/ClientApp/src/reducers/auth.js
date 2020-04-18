
const initialState = {
    spotifyCode: null,
    accessToken: null,
    isLoggedIn: false
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                spotifyCode: action.spotifyCode,
                accessToken: state.accessToken
            }
        case 'GET_ACCESS_TOKEN':
            return {
                spotifyCode: state.spotifyCode,
                accessToken: action.accessToken
            }
        case 'LOGOUT_USER':
            return {
                spotifyCode: null,
                accessToken: null
            }
        default:
            return state
    }
}

export default auth
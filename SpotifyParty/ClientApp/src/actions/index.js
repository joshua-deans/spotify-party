export const loginUser = code => ({
    type: 'LOGIN_USER',
    spotifyCode: code
})

export const getAccessToken = token => ({
    type: 'GET_ACCESS_TOKEN',
    accessToken: token
})

export const logoutUser = () => ({
    type: 'LOGOUT_USER'
})
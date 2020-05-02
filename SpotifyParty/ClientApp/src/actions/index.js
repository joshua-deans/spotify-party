export const loginUser = code => ({
    type: 'LOGIN_USER',
    spotifyCode: code
})

export const getAccessToken = token => ({
    type: 'GET_ACCESS_TOKEN',
    accessToken: token
});

export const authFinished = (user) => ({
    type: 'AUTH_FINISHED'
});

export const verifyLogin = (user) => ({
    type: 'VERIFY_LOGIN',
    isLoggedIn: true, 
    user: user
});

export const logoutUser = () => ({
    type: 'LOGOUT_USER',
    isLoggedIn: false
});
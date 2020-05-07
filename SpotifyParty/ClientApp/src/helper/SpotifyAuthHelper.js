import { ClientCredentials } from './ClientCredentials';

const scopes = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "streaming", "user-read-email", "user-read-private"
];

export let SpotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${ClientCredentials.client_id}&redirect_uri=${window.origin}&scope=${scopes.join("%20")}&response_type=code`

export let getAuthCode = (props) => {
    if (props.spotifyCode) {
        return props.spotifyCode;
    }
    let localCode = localStorage.getItem('spotifyCode');
    if (localCode) {
        props.loginUser(localCode);
        return localCode;
    }
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let code = params.get('code');
    if (code) {
        props.loginUser(code);
        localStorage.setItem('spotifyCode', code);
        return code;
    }
    return null;
}

export let getAccessToken = (props) => {
    if (props.accessToken) {
        return this.props.accessToken;
    }
    let localToken = localStorage.getItem('accessToken');
    if (localToken) {
        return JSON.parse(localToken);
    }
    return null;
}

export let requestAccessToken = async (props, accessCode, grantType) => {
    let property = (grantType === 'authorization_code') ? 'code' : 'refresh_token';
    let body = `grant_type=${grantType}&${property}=${accessCode}&redirect_uri=${window.origin}&client_id=${ClientCredentials.client_id}&client_secret=${ClientCredentials.client_secret}`;
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    }).catch(err => {props.logoutUser();
    });
    let data = await response.json()
        .catch(err => {
            props.logoutUser();
            return null;
        });
    if (data) {
        data.created_at = Date.now();
        data.expires_at = data.created_at + data.expires_in * 1000;
        let localToken = JSON.parse(localStorage.getItem("accessToken"));
        if (localToken) {
            let newToken = { ...data, refresh_token: localToken.refresh_token };
            data = newToken;
        }
        localStorage.setItem('accessToken', JSON.stringify(data));

        props.storeAccessToken(data);
    }
    return data;
}

export let getSpotifyUserInfo = async (props, accessToken) => {
    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': 'Bearer ' + accessToken.access_token
        },
        mode: 'cors'
    }).catch(err => props.logoutUser());
    const data = await response.json()
        .catch(err => {
            props.logoutUser();
            return null;
        });
    return data;
}

export let getAppUserInfo = async (props, spotifyUserInfo) => {
    const response = await fetch('/api/User/email/' + spotifyUserInfo.email).catch(err => props.logoutUser());
    let data = await response.json().catch(err => {
        props.logoutUser();
        return null;
    });
    if (data) {
        data.spotifyUserInfo = spotifyUserInfo;
    }
    return data;
}

let addUser = async (props, spotifyUserInfo) => {
    const response = await fetch('api/User', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(spotifyUserInfo)
    }).catch(err => props.logoutUser());
    let data = await response.json().catch(err => {
        props.logoutUser();
        return null;
    });
    return data;
}

export let handleUserAuth = async (context) => {
    let authCode = getAuthCode(context.props);
    console.log(authCode);
    if (!authCode) {
        context.props.logoutUser();
        return;
    }
    let accessToken = getAccessToken(authCode);
    if (!accessToken) {
        accessToken = await requestAccessToken(context.props, authCode, "authorization_code").catch(err => {
            context.props.logoutUser();
        });
    } else if (accessToken && accessToken.refresh_token) {
        accessToken = await requestAccessToken(context.props, accessToken.refresh_token, "refresh_token").catch(err => {
            context.props.logoutUser();
        });
    } 
    console.log(accessToken);
    if (!accessToken || !accessToken.access_token) {
        context.props.logoutUser();
        return;
    }
    let spotifyUserInfo = await getSpotifyUserInfo(context.props, accessToken).catch(err => context.props.logoutUser());
    console.log(spotifyUserInfo);
    let appUserInfo = await getAppUserInfo(context.props, spotifyUserInfo).catch(err => context.props.logoutUser());
    console.log(appUserInfo);
    if (appUserInfo.status === 404) {
        await addUser(context.props, appUserInfo.spotifyUserInfo);
        context.props.verifyUserLogin(appUserInfo);
        context.props.history.replace(context.props.location.pathname);
    } else {
        context.props.verifyUserLogin(appUserInfo);
        context.props.history.replace(context.props.location.pathname);
    }
    setTimeout(async () => {
        let localToken = localStorage.getItem('accessToken');
        await requestAccessToken(context.props, localToken.refresh_token, "refresh_token").catch(err => context.props.logoutUser());
    }, 10 * 60 * 1000);
}
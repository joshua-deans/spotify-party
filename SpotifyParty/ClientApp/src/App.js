import React, { Component } from 'react';
import { Route, generatePath } from 'react-router';
import { Layout } from './components/Layout';
import PartyList from './components/PartyList';
import { CreateParty } from './components/CreateParty';
import PartyRoom from './components/PartyRoom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import spotifyClientInfo from './spotifyClientInformation.js'

import './custom.css'

class App extends Component {

  constructor(props) {
      super(props);
      this.getAccessCode = this.getAccessCode.bind(this);
      this.getAccessToken = this.getAccessToken.bind(this);
      this.requestAccessToken = this.requestAccessToken.bind(this);
      console.log(window.origin);
    }

    componentWillMount() {
        let accessCode = this.getAccessCode();
        if (!accessCode) {
            return;
        }
        let accessToken = this.getAccessToken(accessCode);
        if (!accessToken || accessToken.expires_in < 360) {
            this.requestAccessToken(accessCode);
        } else if (!this.props.accessToken) {
            this.props.storeAccessToken(accessToken);
        }
    }

    async requestAccessToken(accessCode) {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=authorization_code&code=${accessCode}&redirect_uri=${window.origin}&client_id=${spotifyClientInfo.client_id}&client_secret=${spotifyClientInfo.client_secret}`
        });
        const data = await response.json();
        localStorage.setItem('accessToken', JSON.stringify(data));
        this.props.storeAccessToken(data);
    }

    getAccessCode() {
        if (this.props.spotifyCode) {
            return this.props.spotifyCode;
        }
        let localCode = localStorage.getItem('spotifyCode');
        if (localCode) {
            this.props.loginUser(localCode);
            return localCode;
        }
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let code = params.get('code');
        if (code) {
            this.props.loginUser(code);
            localStorage.setItem('spotifyCode', code);
            return code;
        }
        return null;
    }

    getAccessToken() {
        if (this.props.accessToken) {
            return this.props.accessToken;
        }
        let localToken = localStorage.getItem('accessToken');
        if (localToken) {
            return JSON.parse(localToken);
        }
        return null;
    }

  render () {
    return (
      <Layout>
        <Route exact path='/' component={PartyList} />
        <Route path="/create-party" component={CreateParty} />
        <Route path="/party/:id" component={PartyRoom} />
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
    spotifyCode: state.auth.spotifyCode,
    accessToken: state.auth.accessToken
});

const mapDispatchToProps = dispatch => ({
    loginUser: (code) => {
        return dispatch({ type: 'LOGIN_USER', spotifyCode: code });
    },
    storeAccessToken: (token) => {
        return dispatch({ type: 'GET_ACCESS_TOKEN', accessToken: token });
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

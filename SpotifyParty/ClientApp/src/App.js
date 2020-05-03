import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import { Layout } from './components/Layout';
import PartyList from './components/PartyList';
import Landing from './components/Landing';
import CreateParty from './components/CreateParty';
import Loading from './components/Loading';
import PartyRoom from './components/PartyRoom';
import NotFoundView from './components/NotFoundView';
import { connect } from 'react-redux';
import { handleUserAuth } from './helper/SpotifyAuthHelper.js'

import './custom.css'

class App extends Component {

  constructor(props) {
    super(props);
    this.isApi = this.isApi.bind(this);
  }

  componentWillMount() {
    handleUserAuth(this);
  }

  isApi() {
    return window.location.pathname.startsWith("/api");
  }

    loadHome() {
        if (!this.props.isAuthLoaded) {
            return <Loading />;
        }
        return (this.props.isLoggedIn) ? <PartyList /> : <Landing />;
    }

    loadProfile() {
        return (this.props.isAuthLoaded) ? <PartyList /> : <Loading />;
    }

    loadCreateParty() {
        return (this.props.isAuthLoaded) ? <CreateParty /> : <Loading />;
    }

    loadPartyRoom() {
        return (this.props.isAuthLoaded) ? <PartyRoom /> : <Loading />;
    }

  render () {
      if (this.isApi()) {
          return <NotFoundView />;
      }
      return (
          <Layout>
            <Switch>
              <Route exact path='/'>
                {this.loadHome()}
              </Route>
              <Route path="/profile">
                {this.loadProfile()}
              </Route>
              <Route path="/create-party">
                {this.loadCreateParty()}
              </Route>
              <Route path="/party/:id">
                {this.loadPartyRoom()}
              </Route>
              <Route path="*">
                <NotFoundView />
              </Route>
            </Switch>
          </Layout>
    );
  }
}

const mapStateToProps = state => ({
    spotifyCode: state.auth.spotifyCode,
    accessToken: state.auth.accessToken, 
    isLoggedIn: state.auth.isLoggedIn, 
    isAuthLoaded: state.auth.isAuthLoaded
});

const mapDispatchToProps = dispatch => ({
    loginUser: (code) => {
        return dispatch({ type: 'LOGIN_USER', spotifyCode: code });
    },
    finishAuth: () => {
        return dispatch({ type: 'AUTH_FINISHED'});
    },
    logoutUser: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem('spotifyCode');
        return dispatch({ type: 'LOGOUT_USER' });
    },
    storeAccessToken: (token) => {
        return dispatch({ type: 'GET_ACCESS_TOKEN', accessToken: token });
    }, 
    verifyUserLogin: (user) => {
        let userInfo = { userId: user.userId, userName: user.userName, email: user.email, country: user.country };
        return dispatch({ type: 'VERIFY_LOGIN', isLoggedIn: true, user: userInfo });
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

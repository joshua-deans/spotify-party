import React, { Component } from 'react';
import { SpotifyAuthUrl } from '../helper/SpotifyAuthHelper.js';
import { connect } from 'react-redux';
import './Landing.css';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '', summary: '' };
    }

    render() {
        return (
            <div className="Landing-Message">
                <h3 className="text-center">Listen Together</h3>
                <h5 className="text-center"><a href={SpotifyAuthUrl}>Login</a> with your Spotify Account to Get Started!</h5>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthLoaded: state.auth.isAuthLoaded
});

export default connect(mapStateToProps)(Landing);
import React, { Component } from 'react';
import Script from 'react-load-script';

class SpotifyPlayerContainer extends Component {
    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.state = { playerState: null };
    }

    onLoad() {
        window.onSpotifyWebPlaybackSDKReady = () => {
            const token = this.props.accessToken;
            console.log(this.props);
            const player = new window.Spotify.Player({
                name: 'Spotify Party #' + this.props.partyId,
                getOAuthToken: cb => { cb(token.access_token); }
            });

            player.addListener('initialization_error', ({ message }) => { console.error(message); });
            player.addListener('authentication_error', ({ message }) => { console.error(message); });
            player.addListener('account_error', ({ message }) => { console.error(message); });
            player.addListener('playback_error', ({ message }) => { console.error(message); });

            // Playback status updates
            player.addListener('player_state_changed', state => { this.setState({playerState: state}) });

            // Ready
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.connect();
        }
    }

    getCurrentTrackInformation(playerState) {
        console.log(playerState);
        let currentTrack = playerState.track_window.current_track;
        return (
            <div className="text-center">
                <div className="h6">Current Track</div>
                <div>Track Name: {currentTrack.name}</div>
                <div>Artist(s): {currentTrack.artists[0].name}</div>
                <div>Album: {currentTrack.album.name}</div>
            </div>
            )
    }

    render() {
        let playerInfo = (this.state.playerState != null) ? this.getCurrentTrackInformation(this.state.playerState) : <div className="text-center h6">No Music Currently Playing</div> 
        return (
            <div>
                { playerInfo }
                <Script
                    url="https://sdk.scdn.co/spotify-player.js"
                    onError={() => { }}
                    onLoad={this.onLoad}
                />
            </div>
        )
    }
}

export default SpotifyPlayerContainer;
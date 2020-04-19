import React, { Component } from 'react';
import { Progress } from 'reactstrap';
import Script from 'react-load-script';
import './SpotifyPlayerContainer.css';

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
                name: this.props.partyInfo.partyName + ' - Spotify Party',
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
                setInterval(() => {
                    player.getCurrentState().then(state => {
                        if (!state) {
                            return;
                        }

                        this.setState({ playerState: state });
                    });
                }, 750);
            });

            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.connect();
        }
    }

    getCurrentTrackInformation(playerState) {
        let currentTrack = playerState.track_window.current_track;
        let progress = playerState.position / playerState.duration * 100;
        return (
            <div className="currentTrackInformation text-center">
              <img className="SpotifyPlayerContainer-Image img-thumbnail" src={currentTrack.album.images[0].url} />
              <div className="currentTrackDetails">
                <div className="font-weight-bold">{currentTrack.name}</div>
                <div>{currentTrack.artists[0].name}</div>
                <Progress value={progress} className="SpotifyPlayerContainer-Progress" />
              </div>
            </div>
        )
    }

    render() {
        let playerInfo = (this.state.playerState != null) ? this.getCurrentTrackInformation(this.state.playerState) : <div className="currentTrackInformation h6">No Music Currently Playing</div> 
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
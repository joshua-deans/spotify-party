import React, { Component } from 'react';
import { Progress } from 'reactstrap';
import Script from 'react-load-script';
import './SpotifyPlayerContainer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-regular-svg-icons'

class SpotifyPlayerContainer extends Component {
    constructor(props) {
        super(props);
        this.bindMethods = this.bindMethods.bind(this);
        this.bindMethods();
        this.isCurrentUserLeader = this.isCurrentUserLeader.bind(this);
        this.state = { playerState: null, player: null, volume: 50 };
    }

    bindMethods() {
        this.onLoad = this.onLoad.bind(this);
        this.setupSpotifyPlayer = this.setupSpotifyPlayer.bind(this);
        this.getCurrentTrackInformation = this.getCurrentTrackInformation.bind(this);
        this.getArtistNames = this.getArtistNames.bind(this);
        this.returnNoMusicPlaying = this.returnNoMusicPlaying.bind(this);
        this.updateSongState = this.updateSongState.bind(this);
        this.resumeSong = this.resumeSong.bind(this);
        this.playSong = this.playSong.bind(this);
        this.pauseSong = this.pauseSong.bind(this);
        this.changeVolumeClick = this.changeVolumeClick.bind(this);
    }

    componentWillUnmount() {
        if (this.state.player) {
            this.state.player.disconnect();
        }
    }

    async setupSpotifyPlayer() {
        const token = this.props.accessToken;
        const player = new window.Spotify.Player({
            name: this.props.partyInfo.partyName + ' - Spotify Party',
            getOAuthToken: cb => { cb(token.access_token); }
        });

        player.addListener('initialization_error', ({ message }) => { console.error(message); });
        player.addListener('authentication_error', ({ message }) => { console.error(message); });
        player.addListener('account_error', ({ message }) => { console.error(message); });
        player.addListener('playback_error', ({ message }) => { console.error(message); });

        // Playback status updates
        player.addListener('player_state_changed', state => {
            this.setState({ playerState: state });
        });
        // Ready
        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
            setInterval(() => {
                player.getCurrentState().then(state => {
                    if (!state) {
                        return;
                    }
                    this.setState({ playerState: state });
                    this.props.hubConnection.invoke('SendSongState', parseInt(this.props.partyInfo.partyId), state);
                });
            }, 750);
        });

        await player.setVolume(0.5);

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });
        this.setState({ player: player });

        this.props.hubConnection.on('UpdateSongState', this.updateSongState);

        player.connect();
    }

    async updateSongState(leaderState) {
        if (this.isCurrentUserLeader()) {
            return;
        }
        let paused = leaderState.paused;
        let position = leaderState.position;
        let contextUri = leaderState.context.uri;
        if (contextUri !== this.state.player.context.uri) {
            await this.playSong(contextUri);
        }
        if (Math.abs(position - this.state.player.position) >= 5000) {
            await this.state.player.seek(this.state.player.position);
        }
        if (paused !== this.state.player.paused) {
            if (this.state.player.paused) {
                await this.state.player.pause()
            } else {
                await this.state.player.resume();
            }
        }
    };

    async playSong(uri) {
        let id = this.state.player._options.id;
        const token = this.props.accessToken;
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [uri] }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.access_token}`
            },
        });
    }

    onLoad() {
        if (window.Spotify) {
            this.setupSpotifyPlayer();
        }
        window.onSpotifyWebPlaybackSDKReady = () => {
            this.setupSpotifyPlayer();
        };
    }

    getArtistNames(artists) {
        let artistsList = [];
        artists.forEach((artist) => {
            artistsList.push(artist.name);
        });
        return <span>{artistsList.join(", ")}</span>;
    }

    resumeSong() {
        this.state.player.resume()
    }

    pauseSong() {
        this.state.player.pause()
    }

    getPlayButton(playerState) {
        return (!playerState.paused) ?
            <FontAwesomeIcon onClick={this.pauseSong} className="Player-playIcon" icon={faPauseCircle} /> :
            <FontAwesomeIcon onClick={this.resumeSong} className="Player-playIcon" icon={faPlayCircle} />;
    }

    changeVolumeClick(event) {
        let targetRect = document.querySelector('.volumeContainer').getBoundingClientRect();
        let clientY = event.clientY;
        let bottom = targetRect.bottom;
        let top = targetRect.top;
        let volume = (clientY - bottom) / (top - bottom);
        this.state.player.setVolume(volume).then(() => {
            this.setState({ volume: volume * 100 });
        });
    };

    getCurrentTrackInformation(playerState, player) {
        let currentTrack = playerState.track_window.current_track;
        let progress = playerState.position / playerState.duration * 100;
        return (
            <div className="currentTrackInformation text-center">
              <img className="SpotifyPlayerContainer-Image img-thumbnail" src={currentTrack.album.images[0].url} />
              <div className="currentTrackDetails">
                    <div className="font-weight-bold "><a href="#" className="text-white">{currentTrack.name}</a></div>
                <div>{this.getArtistNames(currentTrack.artists)}</div>
                <Progress value={progress} className="SpotifyPlayerContainer-Progress" />
                </div>
                <div className="volumeContainer" onClick={this.changeVolumeClick}>
                    <div className="volume bg-info" style={{height: `${this.state.volume}%`}} />
                </div>
                {this.isCurrentUserLeader() && this.getPlayButton(playerState) }
            </div>
        )
    }

    isCurrentUserLeader() {
        return this.props.user.userId === this.props.partyInfo.partyLeader.userId;
    }

    returnNoMusicPlaying() {
        return (
            <div className="currentTrackInformation">
                <div className="m-auto">
                    <div className="h6">No Music Currently Playing</div>
                    {this.isCurrentUserLeader() && 
                        <div className="p">Connect to the device "{this.props.partyInfo.partyName + ' - Spotify Party'}" on the Spotify App to play music.</div>
                    }
                </div>
            </div>
        );
    };

    render() {
        if (!this.props.partyInfo) {
            return <div className="currentTrackInformation d-flex justify-content-center">
                <div className="align-self-center">
                    <div className="spinner-border text-light playerSpinner" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        }

        let playerInfo = (this.state.playerState != null) ? this.getCurrentTrackInformation(this.state.playerState, this.state.player) : this.returnNoMusicPlaying();
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
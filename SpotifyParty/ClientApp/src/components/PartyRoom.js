import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import PartyRoomInfo from './PartyRoomInfo';
import PartyRoomChat from './PartyRoomChat';
import SpotifyPlayerContainer from './SpotifyPlayerContainer';
import { HubConnectionBuilder } from '@aspnet/signalr';
import './PartyRoom.css';

class PartyRoom extends Component {
    constructor(props) {
        super(props);
        this.fetchPartyInformation = this.fetchPartyInformation.bind(this);
        this.setUpHubConnection = this.setUpHubConnection.bind(this);
        this.handleTabClick = this.handleTabClick.bind(this);
        this.state = { partyInfo: null, partyLeader: null, hubConnection: null, openTab: 'PartyInfo' };
    }

    componentWillMount() {
        let hubConnection = new HubConnectionBuilder()
            .withUrl("/partyhub")
            .build();
        this.setUpHubConnection(hubConnection);
        this.setState({ hubConnection: hubConnection });
        this.fetchPartyInformation();
    };

    componentWillUnmount() {
        let id = this.props.match.params.id;
        this.state.hubConnection.invoke("RemoveUser", parseInt(this.props.user.userId), parseInt(id));
    }

    handleTabClick(event) {
        let partyInfoTab = document.querySelector('#PartyRoom-PartyInfoTab');
        let chatTab = document.querySelector('#PartyRoom-ChatTab');
        if (event.target.id === "PartyRoom-PartyInfoTab") {
            partyInfoTab.classList.add("active");
            chatTab.classList.remove("active");
            this.setState({ openTab: 'PartyInfo' });
        } else {
            partyInfoTab.classList.remove("active");
            chatTab.classList.add("active");
            this.setState({ openTab: 'Chat' });
        }
        event.preventDefault();
    }

    async setUpHubConnection(hubConnection) {
        let id = this.props.match.params.id;
        hubConnection.on('UserAdded', (result) => {
            result = JSON.parse(result);
            let newUser = { userId: result.UserId, userName: result.UserName, email: result.Email, country: result.Country };
            let newPartyInfo = { ...this.state.partyInfo };
            let userInParty = newPartyInfo.users.find(user => user.userId === newUser.userId);
            if (!userInParty) {
                newPartyInfo.users.push(newUser);
                this.setState({ partyInfo: newPartyInfo });
            }
        });
        hubConnection.on('UserLeft', (result) => {
            result = JSON.parse(result);
            let userId = result.UserId;
            let newPartyInfo = { ...this.state.partyInfo };
            let userInParty = newPartyInfo.users.find(user => user.userId === userId);
            if (userInParty) {
                newPartyInfo.users = newPartyInfo.users.filter(user => user.userId != userId);
                this.setState({ partyInfo: newPartyInfo });
            }           
        });
        await hubConnection.start()
            .then(() => {
                hubConnection.invoke("AddUser", parseInt(this.props.user.userId), parseInt(id));
            })
            .catch(err => console.error(err));
    }

    async fetchPartyInformation() {
        let id = this.props.match.params.id;
        const response = await fetch(`api/Party/${id}`);
        const result = await response.json();
        this.setState({partyInfo: { partyId: result.partyId, partyName: result.name, partySummary: result.summary, partyLeader: result.partyLeader, users: result.users }});
    }

    render() {
        if (!this.props.isLoggedIn && this.props.isAuthLoaded) {
            return <Redirect to='/' />;
        } 
        return (
            <div className="d-flex flex-column h-100">
                <ul className="nav">
                    <li className="nav-item">
                        <a id="PartyRoom-PartyInfoTab" className="PartyRoom-Tab nav-link text-white active h3" onClick={this.handleTabClick} href="#">Party Information</a>
                    </li>
                    <li className="nav-item">
                        <a id="PartyRoom-ChatTab" className="PartyRoom-Tab nav-link text-white h3" onClick={this.handleTabClick}  href="#">Chat</a>
                    </li>
                </ul>
                {
                    (this.state.openTab === 'PartyInfo') ? 
                        <PartyRoomInfo partyInfo={this.state.partyInfo} user={this.props.user} /> :
                        <PartyRoomChat />
                }
                <SpotifyPlayerContainer user={this.props.user} spotifyCode={this.props.spotifyCode} accessToken={this.props.accessToken} partyInfo={this.state.partyInfo} hubConnection={this.state.hubConnection} />
                
            </div>
        );
    }
}

const mapStateToProps = state => ({
    spotifyCode: state.auth.spotifyCode,
    accessToken: state.auth.accessToken, 
    isLoggedIn: state.auth.isLoggedIn, 
    isAuthLoaded: state.auth.isAuthLoaded,
    user: state.auth.user
});

export default withRouter(connect(mapStateToProps)(PartyRoom));

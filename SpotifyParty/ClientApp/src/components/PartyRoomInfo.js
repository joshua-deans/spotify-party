import React, { Component } from 'react';
import './PartyRoomInfo.css';

class PartyRoomInfo extends Component {
    constructor(props) {
        super(props);
        this.deleteParty = this.deleteParty.bind(this);
    }

    async deleteParty(event) {
        let id = this.props.partyInfo.partyId;
        const response = await fetch('api/Party/' + id, {
            method: 'DELETE'
        });
        window.location.replace("/");
    }

    render() {
        if (!this.props.partyInfo) {
            return (<div className="PartyRoomInfo-container d-flex justify-content-center flex-grow-1">
                <div className="align-self-center">
                    <div className="spinner-border text-light playerSpinner" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>);
        }
        let isUserLeader = (this.props.partyInfo.partyLeader.userId === this.props.user.userId);
        return (
            <div className="PartyRoomInfo-container text-left flex-grow-1 align-items-center">
                <div className="h5">Party Name: {this.props.partyInfo.partyName}</div>
                <div className="h5">Party Summary: {this.props.partyInfo.partySummary}</div>
                {this.props.partyInfo.partyLeader && <div className="h5">Party Leader: {this.props.partyInfo.partyLeader.userName}</div>}
                <div className="h5 mt-4">Online Users ({this.props.partyInfo.users.length})</div>
                {this.props.partyInfo.users.map(user => {
                    return <div>{user.userName}</div>
                })}
                {
                    isUserLeader &&
                    <button onClick={this.deleteParty} className="btn btn-lg btn-outline-danger mt-auto">End Party</button>
                }
            </div>
        )
    }
}

export default PartyRoomInfo;
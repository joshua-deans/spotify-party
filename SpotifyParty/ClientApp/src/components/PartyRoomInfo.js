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
                <div className="row w-100">
                    <div className="col-sm-6 text-center mb-4">
                        <div><span className="h6">Party Name:</span> {this.props.partyInfo.partyName}</div>
                        <div><span className="h6">Party Summary:</span> {this.props.partyInfo.partySummary}</div>
                        {this.props.partyInfo.partyLeader &&
                            <div><span className="h6">Party Leader:</span> {this.props.partyInfo.partyLeader.userName}</div>
                        }
                    </div>
                    <div className="col-sm-6 text-center">
                        <div className="h6 mb-0">Online Users ({this.props.partyInfo.users.length})</div>
                        {this.props.partyInfo.users.map(user => {
                            return <div key={user.userId}>{user.userName}</div>
                        })}
                    </div>
                 </div>
                {
                    isUserLeader &&
                    <button onClick={this.deleteParty} className="btn btn-outline-danger mt-auto">End Party</button>
                }
            </div>
        )
    }
}

export default PartyRoomInfo;
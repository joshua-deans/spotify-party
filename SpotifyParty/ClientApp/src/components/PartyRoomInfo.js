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
                    <div className="col-sm-6 text-center my-3">
                        <div className="list-group">
                            <div className="list-group-item PartyRoomInfo-listGroupItem"><span>Party Name:</span> {this.props.partyInfo.partyName}</div>
                            <div className="list-group-item PartyRoomInfo-listGroupItem"><span>Party Summary:</span> {this.props.partyInfo.partySummary}</div>
                            {this.props.partyInfo.partyLeader &&
                                <div className="list-group-item PartyRoomInfo-listGroupItem"><span>Party Leader:</span> {this.props.partyInfo.partyLeader.userName}</div>
                            }
                        </div>
                    </div>
                    <div className="col-sm-6 text-center my-3">
                        <div className="list-group">
                            <div className="mb-0 list-group-item PartyRoomInfo-listGroupItem h6">Online Users <span className="badge badge-info ml-1">{this.props.partyInfo.users.length}</span></div>
                            {this.props.partyInfo.users.map(user => {
                                return <div className="list-group-item PartyRoomInfo-listGroupItem" key={user.userId}>{user.userName}</div>
                            })}
                        </div>
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
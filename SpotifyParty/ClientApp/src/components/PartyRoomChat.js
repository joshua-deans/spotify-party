import React, { Component } from 'react';
import './PartyRoomChat.css';

class PartyRoomChat extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="PartyRoomChat-container flex-grow-1 d-flex flex-column">
                <div className="flex-grow-1">Chat is not yet complete</div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Enter a message." />
                    <div className="input-group-append">
                        <button className="btn btn-info" type="button">Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PartyRoomChat;
import React, { Component } from 'react';
import './PartyRoomMessage.css';
import moment from 'moment';

class PartyRoomMessage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let momentObj = moment(this.props.message.dateTime);
        let dateTimeDisplay = momentObj.format("MMM D, h:m A");
        return (
            <div className="PartyRoomMessage-container">
                <div className="d-flex justify-content-between">
                    <div className="PartyRoomMessage-userName mr-3">{this.props.message.sender.userName}</div>
                    <div className="PartyRoomMessage-dateTime ml-3">{dateTimeDisplay}</div>
                </div>
                <div className="PartyRoomMessage-content">{this.props.message.content}</div>
            </div>
        )
    }
}

export default PartyRoomMessage;
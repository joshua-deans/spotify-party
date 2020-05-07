import React, { Component } from 'react';
import './PartyRoomMessage.css';
import moment from 'moment';
import 'moment-timezone';

class PartyRoomMessage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let sender = (this.props.message.sender) ? this.props.message.sender.userName : "Deleted User";
        let timezone = moment.tz.guess();
        let momentObj = moment.tz(this.props.message.dateTime, 'UTC').tz(timezone);
        let dateTimeDisplay = momentObj.format("MMM D, h:mm A");
        return (
            <div className="PartyRoomMessage-container">
                <div className="d-flex justify-content-between">
                    <div className="PartyRoomMessage-userName mr-3">{sender}</div>
                    <div className="PartyRoomMessage-dateTime ml-3">{dateTimeDisplay}</div>
                </div>
                <div className="PartyRoomMessage-content">{this.props.message.content}</div>
            </div>
        )
    }
}

export default PartyRoomMessage;
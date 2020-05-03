import React, { Component } from 'react';
import './PartyRoomChat.css';
import PartyRoomMessage from './PartyRoomMessage';

class PartyRoomChat extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { messageContent: '' };
    }

    handleChange(event) {
        this.setState({ messageContent: event.target.value });
    }

    handleSubmit(event) {
        let partyId = this.props.partyInfo.partyId;
        let userId = this.props.user.userId;
        this.props.hubConnection.invoke("SendMessage", parseInt(partyId), parseInt(userId), this.state.messageContent);
        this.setState({ messageContent: '' });
        event.preventDefault();
    }

    render() {
        let messageCopy = [...this.props.messages];
        return (
            <form onClick={this.handleSubmit} className="PartyRoomChat-container">
                <div className="PartyRoomChat-chatBox">
                    {messageCopy.reverse().map(message => {
                        return <PartyRoomMessage key={message.messageId} message={message} />;
                    })}
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Enter a message." value={this.state.messageContent} onChange={this.handleChange} required />
                    <div className="input-group-append">
                        <button className="btn btn-info" type="submit">Submit</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default PartyRoomChat;
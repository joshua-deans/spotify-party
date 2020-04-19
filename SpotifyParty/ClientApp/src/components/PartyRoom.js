import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import SpotifyPlayerContainer from './SpotifyPlayerContainer';
import './PartyRoom.css';

class PartyRoom extends Component {
    static displayName = PartyRoom.name;

    constructor(props) {
        super(props);
        this.state = { partyId: '', partyName: '', partySummary: '' };
        console.log(this.props.accessToken);
    }
    componentWillMount() {
        let id = this.props.match.params.id;
        fetch('api/Party/' + id)
            .then(response => {
                return response.json();
        }).then(result => {
            this.setState({ partyId: result.id, partyName: result.name, partySummary: result.summary });
        });
    };

    async fetchPartyInformation() {
        var id = this.props.match.params.id;
        const response = await fetch('api/Party/' + id);
        const result = await response.json();
        this.setState({ partyId: result.id, partyName: result.name, partySummary: result.summary });
    }

    render() {
        let id = this.props.match.params.id;
        return (
            <div>
                <header className="partyRoom-header text-center mb-4">
                    <div className="h3">{this.state.partyName}</div>
                    <div className="h5 text-muted">{this.state.partySummary}</div>
                </header>
                <Row>
                    <Col md="6">
                        <SpotifyPlayerContainer spotifyCode={this.props.spotifyCode} accessToken={this.props.accessToken} partyInfo={this.state} />
                    </Col>
                    <Col md="6">
                        <div className="PartyRoomChat">
                            Chat Section
                        </div>
                    </Col>
                </Row>
                
            </div>
        );
    }
}

const mapStateToProps = state => ({
    spotifyCode: state.auth.spotifyCode,
    accessToken: state.auth.accessToken
});

export default connect(mapStateToProps)(PartyRoom);

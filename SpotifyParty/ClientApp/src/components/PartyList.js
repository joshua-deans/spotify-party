import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

class PartyList extends Component {
  static displayName = PartyList.name;

  constructor(props) {
    super(props);
    this.renderPartiesTable = this.renderPartiesTable.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.state = { parties: [], loading: true };
  }

  componentDidMount() {
    this.populatePartyData();
    }

  isLoggedIn() {
      return this.props.accessToken != null && this.props.spotifyCode != null;
  }

  renderPartiesTable(parties) {
      let disabledStatus = (!this.isLoggedIn()) ? "disabled" : "";
      return (
      <table className='table table-striped' aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Summary</th>
            <th>Room Link</th>
          </tr>
        </thead>
        <tbody>
          {parties.map(party =>
            <tr key={party.partyId}>
              <td>{party.startTime}</td>
              <td>{party.name}</td>
              <td>{party.summary}</td>
              <td>
                <a className={"btn btn-primary " + disabledStatus} href={"/party/" + party.partyId} role="button">Chat</a>{' '}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderPartiesTable(this.state.parties);

    return (
      <div>
        <h1 id="tableLabel" >Available Parties</h1>
        <p>This component shows all available parties</p>
        {contents}
      </div>
    );
  }

  async populatePartyData() {
    const response = await fetch('api/Party');
    const data = await response.json();
    this.setState({ parties: data, loading: false });
  }
}

const mapStateToProps = state => ({
    spotifyCode: state.auth.spotifyCode,
    accessToken: state.auth.accessToken, 
    isLoggedIn: state.auth.isLoggedIn
});

export default connect(mapStateToProps)(PartyList);
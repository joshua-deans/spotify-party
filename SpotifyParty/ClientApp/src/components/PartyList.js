import React, { Component } from 'react';
import { connect } from 'react-redux';

class PartyList extends Component {
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
      return this.props.isLoggedIn;
  }

  renderPartiesTable(parties) {
      let disabledStatus = (!this.isLoggedIn()) ? "disabled" : "";
      if (parties.length === 0) {
          return (
              <div>
              </div>
          );
      }
      return (
          <div className="card PartyList-card">
          <table className='table table-dark PartyList-table' aria-labelledby="tableLabel">
        <tbody>
          {parties.map(party =>
            <tr className="PartyList-tr" key={party.partyId}>
              <td>{party.name}</td>
              <td>{"Users: " + party.users.length}</td>
              <td>
                <a className={"btn btn-primary btn-sm float-right " + disabledStatus} href={"/party/" + party.partyId} role="button">Join Party</a>{' '}
              </td>
            </tr>
          )}
        </tbody>
              </table>
              </div>
    );
  }

  render() {
    let contents = (this.state.loading)
        ? <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
      : this.renderPartiesTable(this.state.parties);

      let title = (!this.state.loading && this.state.parties.length === 0)
          ? "No Parties Available" : "Join A Party"
      title = (this.state.loading) ? "" : title;
    return (
      <div className="PartyList-container text-center">
            <h3 className="text-center" id="tableLabel">{title}</h3>
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
    isLoggedIn: state.auth.isLoggedIn,
    isAuthLoaded: state.auth.isAuthLoaded
});

export default connect(mapStateToProps)(PartyList);
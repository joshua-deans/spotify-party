import React, { Component } from 'react';

export class PartyList extends Component {
  static displayName = PartyList.name;

  constructor(props) {
    super(props);
    this.state = { parties: [], loading: true };
  }

  componentDidMount() {
    this.populatePartyData();
  }

  static renderPartiesTable(parties) {
    return (
      <table className='table table-striped' aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {parties.map(party =>
            <tr key={party.startTime}>
            <td>{party.startTime}</td>
            <td>{party.name}</td>
            <td>{party.summary}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : PartyList.renderPartiesTable(this.state.parties);

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

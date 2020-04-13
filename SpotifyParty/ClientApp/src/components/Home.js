import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { parties: [], loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  static renderForecastsTable(parties) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
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
      : Home.renderForecastsTable(this.state.parties);

    return (
      <div>
        <h1 id="tabelLabel" >Available Parties</h1>
        <p>This component shows all available parties</p>
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
    const response = await fetch('api/Party');
    const data = await response.json();
    this.setState({ parties: data, loading: false });
  }
}

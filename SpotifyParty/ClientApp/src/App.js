import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { PartyList } from './components/PartyList';
import { CreateParty } from './components/CreateParty';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={PartyList} />
        <Route path="/create-party" component={CreateParty} />
        <Route path='/login' component={PartyList} />
      </Layout>
    );
  }
}

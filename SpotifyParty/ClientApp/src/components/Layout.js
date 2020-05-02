import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div className="Layout" >
        <NavMenu />
        <Container className="Layout-container">
          {this.props.children}
        </Container>
      </div>
    );
  }
}

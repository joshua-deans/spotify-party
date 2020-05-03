import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { connect } from 'react-redux';
import { SpotifyAuthUrl } from '../helper/SpotifyAuthHelper.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadphonesAlt, faCamera } from '@fortawesome/free-solid-svg-icons'

class NavMenu extends Component {
  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
      };
      this.getLoggedInLinks = this.getLoggedInLinks.bind(this);
      this.getLoggedOutLinks = this.getLoggedOutLinks.bind(this);
      this.logOut = this.logOut.bind(this);
    }

    logOut(event) {
        this.props.logOut();
        localStorage.removeItem("spotifyCode");
        localStorage.removeItem("accessToken");
        window.location.replace('/');
        event.preventDefault();
    }

    getProfile(event) {
        console.log(event);
    }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  getLoggedInLinks() {
      return (
          <ul className="navbar-nav flex-grow">
              <NavItem>
                  <NavLink tag={Link} to="/">Home</NavLink>
              </NavItem>
              {false &&
                  <NavItem>
                      <a className="nav-link" onClick={event => this.getProfile(event)} href="#">Profile</a>
                  </NavItem>
              }
              
              <NavItem>
                  <NavLink tag={Link} to="/create-party">Create Party</NavLink>
              </NavItem>
              <NavItem>
                  <a className="nav-link" onClick={event => this.logOut(event)} href="#">Logout</a>
              </NavItem>
          </ul>
      );
    }

    getLoggedOutLinks() {
        if (!this.props.isAuthLoaded) {
            return <ul className="navbar-nav flex-grow"></ul>
        }
        return (
            <ul className="navbar-nav flex-grow">
                <NavItem>
                    <NavLink tag={Link} to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <a className="nav-link" href={SpotifyAuthUrl}>Login</a>
                </NavItem>
            </ul>);
    }

  render() {
    let navbarLinks = (this.props.isLoggedIn) ? this.getLoggedInLinks() : this.getLoggedOutLinks();
    return (
      <header className="NavMenu">
        <Navbar className="navbar-expand-sm navbar-toggleable-sm navbar-dark box-shadow mb-3 NavMenu-navbar" light>
          <Container>
            <NavbarBrand tag={Link} to="/">
                <FontAwesomeIcon onClick={this.pauseSong} icon={faHeadphonesAlt} size="lg" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                { navbarLinks }
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}

const mapStateToProps = state => ({
    spotifyCode: state.auth.spotifyCode,
    accessToken: state.auth.accessToken, 
    isLoggedIn: state.auth.isLoggedIn,
    isAuthLoaded: state.auth.isAuthLoaded
});

const mapDispatchToProps = dispatch => ({
    logOut: () => {
        dispatch({ type: 'LOGOUT_USER' });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { connect } from 'react-redux';

class NavMenu extends Component {
  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
      };
      this.logOut = this.logOut.bind(this);
    }

    logOut(event) {
        this.props.logOut();
        localStorage.removeItem("spotifyCode");
        localStorage.removeItem("accessToken");
        event.preventDefault();
    }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
      let client_id = '363694e7bb1d452eb925484471c45fbf';
      console.log(this.props);
      const scopes = [
          "user-read-currently-playing",
          "user-read-playback-state",
          "streaming", "user-read-email", "user-read-private"
      ];
      let spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${window.origin}&scope=${scopes.join("%20")}&response_type=code&show_dialog=true`
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm navbar-dark bg-dark border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">Spotify Party</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/create-party">Create Party</NavLink>
                </NavItem>
                {(!this.props.spotifyCode) ?
                    <NavItem>
                      <a className="nav-link" href={spotifyAuthUrl}>Login</a>
                    </NavItem> :
                    <NavItem>
                    <a className="nav-link" onClick={event => this.logOut(event)} href="#">Logout</a>
                    </NavItem>
                }
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
    accessToken: state.auth.accessToken
});

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch({ type: 'LOGOUT_USER'})
});

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
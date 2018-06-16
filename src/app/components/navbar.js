import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signout } from "../actions";
import { isSignedIn } from "../selectors";

class NavBar extends Component {
  state = { menuActive: false };

  handleMenu = () => {
    this.setState({ menuActive: !this.state.menuActive });
  };

  handleSignout = () => {
    const { dispatch, history } = this.props;
    dispatch(signout());
    history.replace("/signin");
  };

  gotoHome = () => {
    this.props.history.push("/");
  };

  render() {
    const { menuActive } = this.state;
    const { signedIn } = this.props;

    return (
      <nav className="navbar has-shadow is-transparent">
        <div className="navbar-brand">
          <a className="navbar-item" onClick={this.gotoHome}>
            Home
          </a>
          <div
            data-target="navbarMenu"
            className={`navbar-burger burger ${menuActive && "is-active"}`}
            onClick={this.handleMenu}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div id="navbarMenu" className={`navbar-menu ${menuActive && "is-active"}`} onClick={this.handleMenu}>
          {signedIn ? (
            <div className="navbar-end">
              <Link className="navbar-item" to="/profile">
                Profile
              </Link>
              <a className="navbar-item" onClick={this.handleSignout}>
                Sign Out
              </a>
            </div>
          ) : (
            <div className="navbar-end">
              <Link className="navbar-item" to="/signin">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </nav>
    );
  }
}

export default withRouter(
  connect(state => ({
    signedIn: isSignedIn(state)
  }))(NavBar)
);

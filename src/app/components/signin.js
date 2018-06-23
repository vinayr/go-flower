import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { signin } from "../actions";
import { isSigningIn, isSignedIn } from "../selectors";

class Signin extends Component {
  email = React.createRef();
  password = React.createRef();

  componentDidMount() {
    // TODO delete later
    if (this.props.signedIn) return;
    this.email.current.value = "admin@test.com";
    this.password.current.value = "admin";
  }

  handleSignin = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    const user = {
      username: this.email.current.value,
      password: this.password.current.value
    };
    console.log("signin user", user);
    dispatch(signin(user));
  };

  gotoSignup = () => {
    this.props.history.replace("/signup");
  };

  render() {
    const { signingIn, signedIn } = this.props;

    if (signedIn) {
      const { state } = this.props.location;
      const to = state ? state.from : "/";
      return <Redirect to={to} />;
    }

    return (
      <div className="columns is-fullheight is-centered is-vcentered">
        <div className="column is-3">
          <div className="box">
            <form onSubmit={this.handleSignin}>
              <div className="field">
                <p className="control">
                  <input className="input" type="email" placeholder="Email" autoFocus ref={this.email} />
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <input className="input" type="password" placeholder="Password" ref={this.password} />
                </p>
              </div>
              <div className="field is-grouped is-grouped-centered">
                <button className={`button ${signingIn ? "is-loading" : ""}`}>Sign in</button>
              </div>
            </form>
          </div>
          <div className="field is-grouped is-grouped-centered">
            <button className="button is-white" onClick={this.gotoSignup}>
              Sign up
            </button>
            <button className="button is-white">Forgot password?</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(state => ({
    signingIn: isSigningIn(state),
    signedIn: isSignedIn(state)
  }))(Signin)
);

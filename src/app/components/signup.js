import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { signup } from "../actions";
import { isSignedIn } from "../selectors";

class Signup extends Component {
  state = { signingUp: false };
  email = React.createRef();
  password = React.createRef();

  handleSignup = async e => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    const user = {
      username: this.email.current.value,
      password: this.password.current.value
    };
    console.log("signup user", user);
    this.setState({ signingUp: true });
    const success = await dispatch(signup(user));
    this.setState({ signingUp: false });
    if (!success) return;
    history.replace("/signin");
  };

  render() {
    const { signingUp } = this.state;
    const { signedIn } = this.props;

    if (signedIn) {
      const { state } = this.props.location;
      const to = state ? state.from : "/";
      return <Redirect to={to} />;
    }

    return (
      <div className="columns is-fullheight is-centered is-vcentered">
        <div className="column is-3">
          <div className="box">
            <form onSubmit={this.handleSignup}>
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
                <button className={`button ${signingUp ? "is-loading" : ""}`}>Sign up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(state => ({
    signedIn: isSignedIn(state)
  }))(Signup)
);

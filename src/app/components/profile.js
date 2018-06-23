import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateUser } from "../actions";
import { getUser } from "../selectors";

class Profile extends Component {
  email = React.createRef();

  handleSave = async e => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    const params = { username: this.email.current.value };
    console.log("params", params);
    const success = await dispatch(updateUser(params));
    if (!success) return;
    history.replace("/signin");
  };

  render() {
    const { user } = this.props;

    if (!user.id) return null;

    return (
      <div className="columns is-fullheight is-centered is-vcentered">
        <div className="column">
          <div className="field is-grouped is-grouped-centered">
            <table className="table is-bordered">
              <tbody>
                <tr>
                  <td>id</td>
                  <td>{user.id}</td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "middle" }}>username</td>
                  {/* <td>{user.username}</td> */}
                  <td>
                    <input className="input" type="email" defaultValue={user.username} ref={this.email} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="field is-grouped is-grouped-centered">
            <a onClick={this.handleSave}>Save</a>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(state => ({
    user: getUser(state)
  }))(Profile)
);

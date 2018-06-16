import React, { Component } from "react";
import { connect } from "react-redux";
import { formatTime } from "../../utils";
import { fetchUser } from "../../actions";

class User extends Component {
  state = { user: {} };

  async componentDidMount() {
    const { dispatch, match } = this.props;
    const { id } = match.params;
    const user = await dispatch(fetchUser(id));
    if (!user) return;
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    if (!user.id) return null;

    return (
      <div className="columns is-fullheight is-centered is-vcentered">
        <table className="table is-bordered">
          <tbody>
            <tr>
              <td>id</td>
              <td>{user.id}</td>
            </tr>
            <tr>
              <td>username</td>
              <td>{user.username}</td>
            </tr>
            <tr>
              <td>createdAt</td>
              <td>{formatTime(user.createdAt)}</td>
            </tr>
            <tr>
              <td>updatedAt</td>
              <td>{formatTime(user.updatedAt)}</td>
            </tr>
            <tr>
              <td>isAdmin</td>
              <td>{user.isAdmin.toString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect()(User);

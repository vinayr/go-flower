import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { formatTime } from "../../utils";
import { fetchUsers } from "../../actions";
import { getUsers } from "../../selectors";

class Admin extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }

  render() {
    const { users } = this.props;

    return (
      <div className="columns is-fullheight is-centered">
        <section className="section">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Created</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>
                    <Link to={`/admin/users/${user.id}`}>{user.id}</Link>
                  </td>
                  <td>{user.username}</td>
                  <td>{formatTime(user.createdAt)}</td>
                  <td>{formatTime(user.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

export default connect(state => ({
  users: getUsers(state)
}))(Admin);

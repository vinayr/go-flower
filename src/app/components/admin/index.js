import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { fetchUsers } from "../../actions";
import { getUser, getUsers } from "../../selectors";

class Admin extends Component {
  componentDidMount() {
    if (!this.props.user.isAdmin) return;
    this.props.dispatch(fetchUsers());
  }

  formatTime = time => {
    const f = "YYYY-MM-DD HH:mm A";
    return moment(time).format(f);
  };

  handleClick = id => {
    console.log("clicked", id);
  };

  render() {
    const { user, users } = this.props;

    if (!user.isAdmin) {
      return <div className="columns is-fullheight is-centered is-vcentered">Unauthorized</div>;
    }

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
                  <td>{this.formatTime(user.createdAt)}</td>
                  <td>{this.formatTime(user.updatedAt)}</td>
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
  user: getUser(state),
  users: getUsers(state)
}))(Admin);

import React from "react";
import { connect } from "react-redux";
import { getUser } from "../selectors";

const Profile = ({ user }) => {
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
        </tbody>
      </table>
    </div>
  );
};

export default connect(state => ({
  user: getUser(state)
}))(Profile);

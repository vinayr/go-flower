import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../selectors";

const Home = ({ user }) => (
  <div className="columns is-fullheight is-vcentered">
    <div className="column has-text-centered">
      <p>{user.id ? `Welcome ${user.username}` : `Not signed in`}</p>
      {user.isAdmin && (
        <p>
          Go to <Link to="/admin">Dashboard</Link>
        </p>
      )}
    </div>
  </div>
);

export default connect(state => ({
  user: getUser(state)
}))(Home);

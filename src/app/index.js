import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import store from "./store";
import { authenticate } from "./actions";
import { isSignedIn, isAdmin } from "./selectors";

import Home from "./components/home";
import Signup from "./components/signup";
import Signin from "./components/signin";
import Profile from "./components/profile";
import Admin from "./components/admin";
import User from "./components/admin/user";
import Notification from "./components/notification";
import NavBar from "./components/navbar";
import NotFound from "./components/notfound";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isSignedIn(store.getState()) ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />
      )
    }
  />
);

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (isAdmin(store.getState()) ? <Component {...props} /> : <NotFound />)} />
);

export default class App extends Component {
  state = { loading: true };

  async componentDidMount() {
    await store.dispatch(authenticate());
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) return null;

    return (
      <Provider store={store}>
        <Router>
          <div>
            <Notification />
            <NavBar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/signin" exact component={Signin} />
              <PrivateRoute path="/profile" exact component={Profile} />
              <AdminRoute path="/admin" exact component={Admin} />
              <AdminRoute path="/admin/users/:id" exact component={User} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

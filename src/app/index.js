import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import store from "./store";
import { authenticate } from "./actions";
import { isSignedIn } from "./selectors";

import Home from "./components/home";
import Signup from "./components/signup";
import Signin from "./components/signin";
import Profile from "./components/profile";
import Admin from "./components/admin";
import User from "./components/admin/user";
import Notification from "./components/notification";
import NavBar from "./components/navbar";

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

export default class App extends Component {
  componentDidMount() {
    store.dispatch(authenticate());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Notification />
            <NavBar />
            <Switch>
              <PrivateRoute path="/profile" exact component={Profile} />
              <PrivateRoute path="/admin" exact component={Admin} />
              <PrivateRoute path="/admin/users/:id" component={User} />
              <Route path="/" exact component={Home} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/signin" exact component={Signin} />
              <Route render={() => <div>Not Found</div>} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

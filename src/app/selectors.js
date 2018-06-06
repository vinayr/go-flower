// TODO https://github.com/reactjs/reselect#sharing-selectors-with-props-across-multiple-component-instances

import { createSelector } from "reselect";
import * as fromAuth from "./reducers/auth";
import * as fromAdmin from "./reducers/admin";
import * as fromNoti from "./reducers/noti";

const auth = state => state.auth;
const admin = state => state.admin;
const noti = state => state.noti;

// auth
export const isSigningIn = createSelector(auth, fromAuth.isSigningIn);
export const isSignedIn = createSelector(auth, fromAuth.isSignedIn);
export const getUser = createSelector(auth, fromAuth.getUser);

// admin
export const getUsers = createSelector(admin, fromAdmin.getUsers);

// notification
export const getNotification = createSelector(noti, fromNoti.getNotification);

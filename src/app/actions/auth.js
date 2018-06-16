import C from "../constants";
import api from "../api";
import { notifyError } from "./noti";

const signingIn = () => ({ type: C.SIGNING_IN });
const signedIn = () => ({ type: C.SIGNED_IN });
const signedOut = () => ({ type: C.SIGNED_OUT });
const addUser = user => ({ type: C.ADD_USER, user });

let token = null;
let tokenExpiry = null;
let tokenTimer = null;
// const tokenExpiryMargin = 60 * 1000; // 1 minute
const tokenExpiryMargin = 5000; // 5 sec

const getTokenExpiry = token => {
  try {
    return JSON.parse(atob(token.split(".")[1])).exp * 1000;
  } catch (err) {
    return 0;
  }
};

const clearToken = () => {
  if (tokenTimer) clearTimeout(tokenTimer);
  localStorage.removeItem("token");
  token = null;
  tokenExpiry = null;
};

const saveToken = t => {
  token = t;
  tokenExpiry = getTokenExpiry(token);
  localStorage.setItem("token", token);
  setTokenExpire();
};

const refreshToken = async () => {
  console.log("refresh token");
  const data = await api.refreshToken();
  saveToken(data.token);
};

const setTokenExpire = () => {
  if (tokenTimer) clearTimeout(tokenTimer);
  const expiryTime = tokenExpiry - Date.now() - tokenExpiryMargin;
  tokenTimer = setTimeout(refreshToken, expiryTime);
};

const tokenExists = () => {
  token = localStorage.getItem("token");
  if (!token) return false;
  tokenExpiry = getTokenExpiry(token);
  if (tokenExpiry < Date.now()) return false;
  setTokenExpire();
  return true;
};

export const fetchProfile = () => async dispatch => {
  const user = await api.fetchProfile();
  dispatch(addUser(user));
};

export const signup = user => async dispatch => {
  try {
    await api.signup(user);
    return true;
  } catch (err) {
    if (err.response.status === 409) {
      dispatch(notifyError(user.username + " already exists"));
    } else {
      dispatch(notifyError("signup error" + err));
    }
    return false;
  }
};

export const signin = user => async dispatch => {
  dispatch(signingIn());
  try {
    const data = await api.signin(user);
    saveToken(data.token);
    await dispatch(fetchProfile());
    dispatch(signedIn());
  } catch (err) {
    dispatch(notifyError("Invalid username or password"));
    dispatch(signedOut());
  }
};

export const signout = () => dispatch => {
  clearToken();
  dispatch(signedOut());
};

export const authenticate = () => async dispatch => {
  if (tokenExists()) {
    await dispatch(fetchProfile());
    dispatch(signedIn());
  } else {
    dispatch(signedOut());
  }
  Promise.resolve();
};

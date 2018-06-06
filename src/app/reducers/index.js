import { combineReducers } from "redux";
import auth from "./auth";
import admin from "./admin";
import noti from "./noti";

export default combineReducers({
  auth,
  admin,
  noti
});

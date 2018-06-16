import C from "../constants";
import api from "../api";
import { notifyError } from "../actions";

const addUsers = users => ({ type: C.ADD_USERS, users });

export const fetchUsers = () => async dispatch => {
  const users = await api.fetchUsers();
  dispatch(addUsers(users));
};

export const fetchUser = id => async dispatch => {
  try {
    const user = await api.fetchUser(id);
    return user;
  } catch (err) {
    if (err.response.status === 404) {
      dispatch(notifyError("Invalid user id"));
    }
  }
};

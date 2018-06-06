import C from "../constants";
import api from "../api";

const addUsers = users => ({ type: C.ADD_USERS, users });

export const fetchUsers = () => async dispatch => {
  const users = await api.fetchUsers();
  dispatch(addUsers(users));
};

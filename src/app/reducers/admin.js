import C from "../constants";

const initialState = {
  users: []
};

export default function admin(state = initialState, action) {
  switch (action.type) {
    case C.ADD_USERS:
      return { ...state, users: action.users };
    case C.SIGNED_OUT:
      return { ...state, users: [] };
    default:
      return state;
  }
}

export const getUsers = state => state.users;

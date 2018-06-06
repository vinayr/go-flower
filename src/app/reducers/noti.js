import C from "../constants";

const initialState = {
  type: "",
  message: ""
};

export default function noti(state = initialState, action) {
  switch (action.type) {
    case C.SUCCESS:
      return { ...state, type: "is-success", message: action.message };
    case C.ERROR:
      return { ...state, type: "is-danger", message: action.message };
    case C.CLEAR:
      return { ...state, type: "", message: "" };
    default:
      return state;
  }
}

export const getNotification = state => state;

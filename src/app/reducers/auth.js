import C from "../constants";

const initialState = {
  signingIn: false,
  signedIn: false,
  user: {}
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case C.SIGNING_IN:
      return { ...state, signingIn: true };
    case C.SIGNED_IN:
      return { ...state, signedIn: true, signingIn: false };
    case C.SIGNED_OUT:
      return { ...state, signedIn: false, signingIn: false, user: {} };
    case C.ADD_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
}

export const isSigningIn = state => state.signingIn;
export const isSignedIn = state => state.signedIn;
export const isAdmin = state => state.user.isAdmin;
export const getUser = state => state.user;

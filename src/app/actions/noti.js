import C from "../constants";

export const notifySuccess = message => ({ type: C.SUCCESS, message });
export const notifyError = message => ({ type: C.ERROR, message });
export const notifyClear = () => ({ type: C.CLEAR });

import moment from "moment";

export const formatTime = time => {
  const f = "YYYY-MM-DD HH:mm A";
  return moment(time).format(f);
};

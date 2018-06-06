import React from "react";
import { connect } from "react-redux";
import { notifyClear } from "../actions";
import { getNotification } from "../selectors";

const Notification = ({ noti, dispatch }) => {
  if (!noti.message) return null;
  return (
    <div className={`notification is-fixed-top ${noti.type}`}>
      <button className="delete" onClick={() => dispatch(notifyClear())} />
      {noti.message}
    </div>
  );
};

export default connect(state => ({
  noti: getNotification(state)
}))(Notification);

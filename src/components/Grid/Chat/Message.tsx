import React from "react";

import "./Chat.css";

interface MessageType {
  text: string;
  isSentByCurrentUser: boolean;
}

export default function Message(props: MessageType) {
  const formatAMPM = (date: Date) => {
    var hours = date.getHours();
    var minutes: any = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };
  const { text, isSentByCurrentUser } = props;
  return isSentByCurrentUser ? (
    <li>
      <div className="msj-rta macro sender">
        <div className="text text-r">
          <p>{text}</p>
          <p>
            <small>{formatAMPM(new Date())}</small>
          </p>
        </div>
      </div>
      <div className="avatar"></div>
    </li>
  ) : (
    <li>
      <div className="msj macro">
        <div className="text text-l">
          <p>{text}</p>
          <p>
            <small>{formatAMPM(new Date())}</small>
          </p>
        </div>
      </div>
    </li>
  );
}

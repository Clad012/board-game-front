import React, { useEffect } from "react";
import Message from "./Message";
import Card from "react-bootstrap/Card";

import "./Chat.css";

interface MessageType {
  text: string;
  isSentByCurrentUser: boolean;
}

interface ChatType {
  messages: MessageType[];
  message: string;
  setMessage: (str: string) => void;
  sendMessage: (event: any) => void;
}
export default function Chat(props: ChatType) {
  let { messages, setMessage, sendMessage, message } = props;
  let chatContainer: any = null;
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    if (chatContainer) chatContainer.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Card className="mt-2">
      <Card.Body>
        <div className="frame">
          <ul>
            {messages.map((message, i) => (
              <div key={i}>
                <Message
                  text={message.text}
                  isSentByCurrentUser={message.isSentByCurrentUser}
                />
              </div>
            ))}
            <div ref={(ref: any) => (chatContainer = ref)}></div>
          </ul>
        </div>
        <div>
          <div className="input-holder">
            <input
              className="mytext"
              placeholder="Type a message"
              value={message}
              onChange={({ target: { value } }) => setMessage(value)}
              onKeyPress={(event) =>
                event.key === "Enter" ? sendMessage(event) : null
              }
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

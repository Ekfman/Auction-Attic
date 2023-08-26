import { useState } from "react";
import { messageApi } from "./Api";

const MessageForm = ({ token, postId, handleMessageSent, username }) => {
  const [message, setMessage] = useState("");

  const handleFormSubmision = async (e) => {
    e.preventDefault();
    try {
      const data = await messageApi({ token, postId, message });
      console.log(data);
      handleMessageSent();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Send message to {username} </h3>
      <form onSubmit={handleFormSubmision} className="messageForm">
        <input
          className="messageInput"
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder=" Type your message here..."
          required
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default MessageForm;

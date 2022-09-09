import { useEffect, useState } from "react";
import { inboxApi } from "./Api";

const Messages = ({ token, username }) => {
  
    const [newMessages, setNewMessages] = useState([]);
    
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchMessage = await inboxApi({ token });
        setNewMessages(fetchMessage.data.messages);
        console.log(fetchMessage.data.messages.fromUser.username)
        
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, [token]);

  return (
    <div>
      <h2 className="pageHeader">My Inbox</h2>
      <div>
        {newMessages.map( newMessage => {
          return (
            <div className="newMessageCard">
              <p>From: {newMessage.fromUser.username} </p>
              <p>Message: </p>
              <p className="messageBody">{newMessage.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Messages;

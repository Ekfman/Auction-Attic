import { useEffect, useState } from "react";
import { inboxApi } from "./Api";

const Messages = ({ token, loggedInUserData }) => {
    const [newMessages, setNewMessages] = useState([]);

    console.log(newMessages)
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchMessage = await inboxApi({ token });
        setNewMessages(fetchMessage.data.messages);
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
              <div>
          {loggedInUserData.username !== newMessage.fromUser.username &&
            <div className="newMessageCard">
                <div className="newMessageBody">
                <p className="inquiry">{newMessage.post.title}</p>
              <p>From: {newMessage.fromUser.username} </p>
              <p>Message: </p>
              <p className="messageBody">{newMessage.content}</p>
              </div>
            </div>
        }
            </div>
        );
        })}
      </div>
    </div>
  );
};

export default Messages;

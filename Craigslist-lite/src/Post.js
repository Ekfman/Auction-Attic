import { useState } from "react";
import MessageForm from "./MessageForm";
import EditPost from "./EditPost";

const Post = ({
  post,
  token,
  setDescription,
  setTitle,
  setPrice,
  setLocation,
  setPosts,
  posts,
  setWillDeliver,
  willDeliver,
  deleteHandler,
}) => {
  const [editFormDisplay, setEditFormDisplay] = useState(false);
  const [messageFormDisplay, setMessageFormDisplay] = useState(false);

  const handleMessageSent = () => {
    setMessageFormDisplay(false);
  };
  const handleMessageButton = () => {
    setMessageFormDisplay(!messageFormDisplay);
  };

  const handleEditButton = () => {
    setEditFormDisplay(!editFormDisplay);
  };

  const handlePostUpdate = () => {
    setEditFormDisplay(false);
  };

  return (
    <div className="postCard" key={post._id}>
      <h3 className="postHeader">{post.title}</h3>
      <div className="postBody">
        <p className="price">
          <span style={{ fontWeight: "bold" }}>Price:</span> {post.price}
        </p>
        <div>
          <p style={{ fontWeight: "bold" }}>Description:</p>
          <p className="description">{post.description}</p>
        </div>
        <div className="locationAndDeliverDiv">
          {post.location ? (
            <p>
              <span style={{ fontWeight: "bold" }}>Location:</span>{" "}
              {post.location}
            </p>
          ) : (
            <p>
              <span style={{ fontWeight: "bold" }}>Location:</span> Not
              Available
            </p>
          )}
          {post.willDeliver ? (
            <p className="willDeliver">
              <span style={{ fontWeight: "bold" }}>Will Deliver:</span> Yes
            </p>
          ) : (
            <p className="willDeliver">
              <span style={{ fontWeight: "bold" }}>Will Deliver:</span> No
            </p>
          )}
        </div>
        <p>
          <span style={{ fontWeight: "bold" }}>Seller:</span>{" "}
          {post.author.username}
        </p>
        <p>Posted: {post.createdAt}</p>
        <div className="authorButtons">
          {post.isAuthor && (
            <button onClick={() => handleEditButton()} className="buttonForm">
              {editFormDisplay ? "Cancel" : "Edit"}
            </button>
          )}
          <div className="messageButton">
            {!post.isAuthor && token ? (
              <button
                onClick={() => handleMessageButton()}
                className="buttonForm"
              >
                {messageFormDisplay ? "Cancel" : "Message"}
              </button>
            ) : null}
          </div>
          {post.isAuthor && (
            <button
              onClick={() => deleteHandler(post._id)}
              className="deleteButton"
            >
              Delete
            </button>
          )}
        </div>
        {editFormDisplay && post.isAuthor && (
          <EditPost
            postId={post._id}
            token={token}
            setDescription={setDescription}
            setPrice={setPrice}
            setTitle={setTitle}
            setLocation={setLocation}
            setWillDeliver={setWillDeliver}
            willDeliver={willDeliver}
            setPosts={setPosts}
            posts={posts}
            handlePostUpdate={handlePostUpdate}
            post={post}
          />
        )}
        <div>
          {token && messageFormDisplay && (
            <MessageForm
              postId={post._id}
              token={token}
              handleMessageSent={handleMessageSent}
              username={post.author.username}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;

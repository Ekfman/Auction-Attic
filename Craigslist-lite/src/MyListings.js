import { useState, useEffect } from "react";
import EditPost from "./EditPost";

const MyListings = ({
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

  const handleEditButton = () => {
    setEditFormDisplay(!editFormDisplay);
  };

  const handlePostUpdate = () => {
    setEditFormDisplay(false);
  };

  const filteredPosts = posts.filter((post) => post.isAuthor);

  return (
    <div>
      <div className="postsPageHeader">
        <h2 className="pageHeader">My Listings:</h2>
      </div>
      {filteredPosts.map((post) => {
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
                    <span style={{ fontWeight: "bold" }}>Will Deliver:</span>{" "}
                    Yes
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
                  <button
                    onClick={() => handleEditButton()}
                    className="buttonForm"
                  >
                    {editFormDisplay ? "Cancel" : "Edit"}
                  </button>
                )}
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
            </div>
          </div>
        );
      })}
    </div>
  );

  // const deleteHandler = async () => {
  //     try{
  //         const postIdToDelete = await deletePostApi({token, postId});
  //         console.log("deleted")
  //         const posts = userPosts.filter(userPost => userPosts._id !== postIdToDelete)
  //     } catch (err) {
  //         console.error(err)
  //     }
  // }
};

export default MyListings;

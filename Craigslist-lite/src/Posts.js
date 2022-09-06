import { useState, useEffect } from "react";
import { fetchApiPosts } from "./Api";
import { EditPost } from "./EditPost";

const Posts = ({ posts, setPosts, userId }) => {
  //1.state for the looged in users id

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const apiData = await fetchApiPosts();
        setPosts(apiData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();

    //2.write an async function to fetch me /api/COHORT-NAME/users/me
    //make sure you set the user id from this call
  }, []);

  return (
    <div>
      <h2 className="pageHeader">Current Items for Sale</h2>
      {posts.map((post) => {
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
                {/* {post.willDeliver ? <p className="willDeliver"><span style={{fontWeight: 'bold'}}>Will Deliver:</span> Yes</p> : <p className="willDeliver"><span style={{fontWeight: 'bold'}}>Will Deliver:</span> No</p>} */}
              </div>
              <p>
                <span style={{ fontWeight: "bold" }}>Seller:</span>{" "}
                {post.author.username}
              </p>
              <p>Posted: {post.createdAt}</p>
              {post.author._id === userId && (
                <button
                  className="buttonForm"
                  onClick={
                    <EditPost
                      title={post.title}
                      description={post.description}
                      price={post.price}
                      stateTitle={title}
                      stateSetTitle={setTitle}
                      stateDescription={description}
                      stateSetDescription={setDescription}
                      statePrice={price}
                      stateSetPrice={setPrice}
                    />
                  }
                >
                  Edit
                </button>
              )}
              <p>author id: {post.author._id}</p>
              {console.log(userId)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;

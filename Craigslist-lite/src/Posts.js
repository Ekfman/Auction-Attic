import { useState, useEffect } from "react";
import { deletePostApi } from "./Api";

import { EditPost } from "./EditPost";


const Posts = ({ posts, setPostId, postId, setPosts, deleteHandler }) => {
    
    const [searchValue, setSearchValue] = useState("")
    
    const postsMatches = post => {
        const textToCheck = (post.title + post.description + post.author.username + post.location + post.price).toLowerCase()
        return textToCheck.includes(searchValue.toLowerCase())
    } 
    const filteredPosts = posts.filter( post => {
              return postsMatches(post)
   
 }) 
      
    return (
    <div>
      <h2 className="pageHeader">Current Items for Sale</h2>
      <form className="formContainer" > 
            <input 
            className="searchBar"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="search...">
            </input>
            <button className="searchButton">Enter</button>
        </form>

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
                {/* {post.willDeliver ? <p className="willDeliver"><span style={{fontWeight: 'bold'}}>Will Deliver:</span> Yes</p> : <p className="willDeliver"><span style={{fontWeight: 'bold'}}>Will Deliver:</span> No</p>} */}
              </div>
              <p>
                <span style={{ fontWeight: "bold" }}>Seller:</span>{" "}
                {post.author.username}
              </p>
              <p>Posted: {post.createdAt}</p>
              {post.isAuthor &&
                <button
                    onClick={whatever}
                  className="buttonForm"
                  //   onClick={
                  //     // <EditPost
                  //     //   title={post.title}
                  //     //   description={post.description}
                  //     //   price={post.price}
                  //     //   stateTitle={title}
                  //     //   stateSetTitle={setTitle}
                  //     //   stateDescription={description}
                  //     //   stateSetDescription={setDescription}
                  //     //   statePrice={price}
                  //     //   stateSetPrice={setPrice}
                  //    // />
                  //   }
                >
                  Edit
                </button>
              }
              {post.isAuthor &&
                <button
                  className="buttonForm"
                //   onClick={() => deleteHandler(user._id)}
                >
                  Delete
                </button>
              }
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;

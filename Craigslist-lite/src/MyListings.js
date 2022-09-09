import { useState, useEffect } from "react";
import { profileApi, deletePostApi } from "./Api"

const MyListings = ({posts, deleteHandler, searchValue, setSearchValue}) => {

    const filteredPosts = posts.filter( post => post.isAuthor )

    return (
        <div>
          <div className="postsPageHeader">
          <h2 className="pageHeader">My Listings:</h2>
          <input 
            className="searchBar"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="search...">
            </input>
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
                    {post.willDeliver ? <p className="willDeliver"><span style={{fontWeight: 'bold'}}>Will Deliver:</span> Yes</p> : <p className="willDeliver"><span style={{fontWeight: 'bold'}}>Will Deliver:</span> No</p>}
                  </div>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Seller:</span>{" "}
                    {post.author?.username}
                  </p>
                  <p>Posted: {post.createdAt}</p>
                  <div className="authorButtons">
                  {post.isAuthor && (
                    <button
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
                  )}
                   { post.isAuthor && 
                    <button onClick={() => deleteHandler(post._id)} className="deleteButton">
                        Delete
                    </button>
                    }
                    </div>
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
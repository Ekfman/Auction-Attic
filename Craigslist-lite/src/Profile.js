import { useState, useEffect } from "react";
import { profileApi } from "./Api"

const Profile = ({userId, setUserId, posts, userPosts, setUserPosts, token}) => {
    
useEffect ( () => {
    const fetchUserId = async () => {
        try{
            const userData = await profileApi ({token});
            console.log(userData.data.posts);
            console.log(userData.data._id)
            setUserPosts(userData.data.posts);
        } catch (err) {
            console.error(err)
        }
    } 
    fetchUserId();
}, [])
    return (
    <div>
        <h2 className="pageHeader">My Listings</h2>
        {userPosts.map( userPost => {
            return (
                <div className="postCard" key={userPost._id}>
                  <h3 className="postHeader">{userPost.title}</h3>
                  <div className="postBody">
                    <p className="price">
                      <span style={{ fontWeight: "bold" }}>Price:</span> {userPost.price}
                    </p>
                    <div>
                      <p style={{ fontWeight: "bold" }}>Description:</p>
                      <p className="description">{userPost.description}</p>
                    </div>
                    <div className="locationAndDeliverDiv">
                      {userPost.location ? (
                        <p>
                          <span style={{ fontWeight: "bold" }}>Location:</span>{" "}
                          {userPost.location}
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
                      {userPost.author.username}
                    </p>
                    <p>Posted: {userPost.createdAt}</p>
                    {userPost.author._id === userId && (
                      <button
                        className="buttonForm"
                        onClick={
                          <EditPost
                            title={userPost.title}
                            description={userPost.description}
                            price={userPost.price}
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
                  </div>
                </div>
                ); 
            })}
    </div>
     );
    };


export default Profile
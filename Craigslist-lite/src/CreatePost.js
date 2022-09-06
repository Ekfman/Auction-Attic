import { useState } from "react";
import { createPostApi } from "./Api";

const CreatePost = ({
  title,
  setTitle,
  description,
  setDescription,
  price,
  setPrice,
  posts,
  setPosts,
  token,
  setLocation,
  location,
  setUserPosts,
  userPosts
}) => {
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const newPost = await createPostApi({
        title,
        description,
        price,
        location,
        token,
      });
      // console.log(newPost)
      setPosts([newPost, ...posts]);
      setUserPosts(newPost);
      console.log(userPosts)
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="margin">
      <form className="form" onSubmit={submitHandler}>
        <input
          className="titleInput"
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
        ></input>
        <input
          className="descriptionInput"
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="Description"
        ></input>
        <div className="postExtras">
          <input
            className="priceInput"
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            placeholder="$0.00"
          ></input>
          <input
            className="locationInput"
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, State"
          ></input>
          {/* <input className="checkbox" type="checkbox" onChange={e => setWillDeliver(e.target.value)}></input> */}
          <label>Will Deliver?</label>
        </div>
        <button>Add Listing</button>
      </form>
    </div>
  );
};

export default CreatePost;

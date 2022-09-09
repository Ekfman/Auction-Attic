import { useState, useEffect } from "react";
import Post from "./Post";

const Posts = ({
  posts,
  deleteHandler,
  token,
  searchValue,
  setSearchValue,
  setDescription,
  setTitle,
  setLocation,
  setWillDeliver,
  setPrice,
  setPosts,
  willDeliver
}) => {
  const postsMatches = (post) => {
    const textToCheck = (
      post.title +
      post.description +
      post.author.username +
      post.location +
      post.price
    ).toLowerCase();
    return textToCheck.includes(searchValue.toLowerCase());
  };
  const filteredPosts = posts.filter((post) => postsMatches(post));

  return (
    <div>
      <div className="postsPageHeader">
        <h2 className="pageHeader">Current Items for Sale</h2>
        <input
          className="searchBar"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="search..."
        ></input>
      </div>

      {filteredPosts.map((post) => {
        return (
          <Post
            post={post}
            token={token}
            setDescription={setDescription}
            setPrice={setPrice}
            setTitle={setTitle}
            setLocation={setLocation}
            setWillDeliver={setWillDeliver}
            setPosts={setPosts}
            posts={posts}
            willDeliver={willDeliver}
          />
        );
      })}
    </div>
  );
};

export default Posts;

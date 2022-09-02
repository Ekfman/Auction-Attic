import { useState, useEffect } from "react";

const baseURL = "https://strangers-things.herokuapp.com/api";
const cohortURL = "/2206-ftb-pt-web-pt";

const Posts = ({posts, setPosts}) => {
    useEffect( () => {
        const fetchPosts = async ()  => {
            const response = await fetch (`${baseURL}${cohortURL}/posts`);
            const data = await response.json();
            setPosts(data.data.posts);
        }
        fetchPosts()
    }, [])
   
    return (
        <div>
            <h2>Current Items for Sale</h2>
            {posts.map( post => {
                return(
                <div key={post._id}>
                    <h2>{post.title}</h2>
                    <h3>Seller: {post.author.username}</h3>
                    <div>
                        <p>Description:</p>
                        <p>{post.description}</p>
                    </div>
                    <p>Price: {post.price}</p>
                    <p>{post.willDeliver}</p>
                </div>
                )
            })}
        </div>
    )
}

export default Posts
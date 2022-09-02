import { useState, useEffect } from "react";

const baseURL = "https://strangers-things.herokuapp.com/api";
const cohortURL = "/2206-ftb-pt-web-pt";

const Posts = ({posts, setPosts}) => {
    useEffect( () => {
        const fetchPosts = async ()  => {
            const response = await fetch (`${baseURL}${cohortURL}/posts`);
            const data = await response.json();
            setPosts(data);
            console.log(setPosts(data))
        }
        fetchPosts()
    }, [])
   
    return (
        <div>
            <h1>Current Items for Sale</h1>
            {posts.map( post => {
                return(
                <div key={post._id}>
                    <h2>{post.title}</h2>
                    <h3>{post.author.username}</h3>
                    <p>{post.description}</p>
                    <p>{post.price}</p>
                    <p>{post.willDeliver}</p>
                </div>
                )
            })}
        </div>
    )
}

export default Posts
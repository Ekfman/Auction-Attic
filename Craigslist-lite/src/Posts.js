import { useState, useEffect } from "react";
import { fetchApiPosts } from "./Api";


const Posts = ({posts, setPosts}) => {
    useEffect ( () => {
        const fetchPosts = async () => {
            try{
                const apiData = await fetchApiPosts()
                setPosts(apiData)
            } catch (err) {
                console.error(err)
            }
        }
        fetchPosts()
    }, [])
   
    return (
        <div>
            <h2>Newest Items for Sale</h2>
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
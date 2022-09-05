import { useState, useEffect } from "react";
import { fetchApiPosts } from "./Api";


const UpdatePost = ({postId, setPostId, posts, setPosts}) => {

}

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
            <h2 className="pageHeader">Current Items for Sale</h2>
            {/* {
                postId ? <Update posts={posts} setPosts={setPosts} postId={postId} setPostId={setPostId}/> : <CreatePost posts={posts} setPosts={setPosts} />
            } */}
            {posts.map( post => {
                return(
                <div className="postCard" key={post._id}>
                    <h3 className="postHeader">{post.title}</h3>
                    <div className="postBody">
                    <p className="price">Price: {post.price}</p>
                    <div>
                        <p>Description:</p>
                        <p>{post.description}</p>
                    </div>
                    <p>{post.willDeliver}</p>
                    <p>Seller: {post.author.username}</p>
                    <p>Posted: {post.createdAt}</p>
                    <button className="buttonForm" onClick={ () => setPostId(post.id)}>Edit</button>
                    </div>
                </div>
                )
            })}
        </div>
    )
}



export default Posts
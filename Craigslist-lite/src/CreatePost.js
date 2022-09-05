import { useState } from "react"
import { createPostApi } from "./Api"

const CreatePost = ({title, setTitle, description, setDescription, price, setPrice, posts, setPosts, token}) => {
    
    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            const newPost = await createPostApi ({title, description, price, token})
            setPosts([newPost, ...posts])
        } catch(err){
            console.error(err);
        }
    }
    return (
        <div className="margin">
            <form className="form" onSubmit={submitHandler}>
                <input className="titleInput" onChange={e => setTitle(e.target.value)} type="text" placeholder="Title"></input>
                <input className="descriptionInput" onChange={e => setDescription(e.target.value)} type="text" placeholder="Description"></input>
                <input className="priceInput" onChange={e => setPrice(e.target.value)} type="text" placeholder="$0.00"></input>
                <button>Add Listing</button>
            </form>
        </div>
    )
}

export default CreatePost
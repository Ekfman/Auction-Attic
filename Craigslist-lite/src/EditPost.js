import { useState } from "react"
import Post from "./Post"
import { EditPostApi } from "./Api"


const EditPost = ({post, postId, token, handlePostUpdate, setPosts}) => {
    
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [price, setPrice] = useState(post.price);
    const [location, setLocation] = useState(post.location);
    const [willDeliver, setWillDeliver] = useState(post.willDeliver);

    const submitHandler = async (e) => {
        e.preventDefault()
        try{
            const updatedPost = await EditPostApi({willDeliver, location, title, description, price, token, postId})
           console.log(updatedPost)
            handlePostUpdate()
            setPosts( prev => prev.map(post => {
                if(post._id === postId){
                    return updatedPost
                } else {
                    return post;
                }
            }))
        } catch (err) {
        console.error(err)
    }
}
    

    return(
        <div className="editForm">
        <form className="form" onSubmit={submitHandler}>
          <input
            className="titleInput"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            required
          ></input>
          <input
            className="descriptionInput"
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            value={description}
            required
          ></input>
          <div className="postExtras">
            <input
              className="priceInput"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              type="text"
              required
            ></input>
            <input
              className="locationInput"
              type="text"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              required
            ></input>
            <label>Will Deliver?</label>
            <input className="checkbox" type="checkbox" onChange={e => setWillDeliver(e.target.value)}></input>
          </div>
          <button>Update Listing</button>
        </form>
      </div>
    )
}

export default EditPost
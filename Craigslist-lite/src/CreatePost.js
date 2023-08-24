import { useState } from "react";
import { createPostApi } from "./Api";
import { useNavigate } from "react-router";



const CreatePost = ({
  title,
  setTitle,
  description,
  setDescription,
  price,
  setPrice,
  posts,
  setPosts,
  location,
  setLocation,
  token
}) => {

const [willDeliver, setWillDeliver] = useState(false)

const navigate = useNavigate()
const handleCheckBox = () => {
    console.log(willDeliver)
    setWillDeliver(!willDeliver)
}
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const newPost = await createPostApi({
        title,
        description,
        price,
        location,
        token,
        willDeliver
      });
      setPosts([newPost, ...posts]);
      navigate("/myListings")
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
          required
        ></input>
        <input
          className="descriptionInput"
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="Description"
          required
        ></input>
        <div className="postExtras">
          <input
            className="priceInput"
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            placeholder="$0.00"
            required
          ></input>
          <input
            className="locationInput"
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, State"
            required
          ></input>
          <label>Will Deliver?</label>
          <input className="checkbox" type="checkbox" checked={willDeliver} onChange={handleCheckBox}></input>
        </div>
        <button>Add Listing</button>
      </form>
    </div>
  );
};

export default CreatePost;

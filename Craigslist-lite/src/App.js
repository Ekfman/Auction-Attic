import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Posts from "./Posts";
import Register from "./Register";
import Login from "./Login";
import CreatePost from "./CreatePost"
import Profile from "./Profile"
import { fetchApiPosts } from "./Api";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [price, setPrice] = useState([])
  const [postUserId, setPostUserId] = useState("")
  const [userId, setUserId] = useState("");
  const [location, setLocation] = useState("Not Available");
  const [willDeliver, setWillDeliver] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [postIdToDelete, setPostIdToDelete] = useState("")
  const [postId, setPostId] = useState("")
  
 
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const apiData = await fetchApiPosts({token});
        setPosts(apiData.data.posts);

      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();

  }, [token]);


  const deleteHandler = async (deletedPostId) => {
    console.log("delete")
    try{
        const fetchDeletedPost = await deletePostApi ({deletedPostId})
        console.log(fetchDeletedPost)
        if(fetchDeletedPost) {
            const newPosts = posts.filter(post => post._id !== deletedPostId)
            setPosts(newPosts)
        }
    } catch (err) {
        console.error(err)
    };
}

  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="navbarLeft">
        <Link className="logo" to="/listings">The <br></br>Auction <br></br>Attic</Link>
        
        </div>
        
            { token ? 
            <Link className="profile" to="/profile">My Profile
                <ul className="dropdown">
                    <li className="userListingsLink"><Link to="/myListings">My Listings</Link></li>
                    <li className="profileLinks"><Link to="/addListing">Create Listing</Link></li>
                    <li className="profileLinks"><Link to="/">Logout</Link></li>
                </ul>
          </Link>
           : 
           <div className="loginLinks">
                <Link className="signup" to="/signup">Sign up</Link>
                <Link className="login" to="/login">Login</Link>
            </div>
            }
    
      </nav>
      <Routes>
        <Route path="/signup" element={<Register username={username} setUsername={setUsername} setPassword={setPassword} password={password} setToken={setToken} />}></Route>
        <Route path="/login" element={<Login username={username} setUsername={setUsername} setPassword={setPassword} password={password} setToken={setToken}/>} ></Route>
        <Route
          path="/listings"
          element={<Posts posts={posts} setPosts={setPosts} token={token} userId={userId} setUserId={setUserId} postUserId={postUserId} setPostUserId={setPostUserId} deleteHandler={deleteHandler} />}
        ></Route>
        <Route path="/addListing" element={<CreatePost title={title} setTitle={setTitle} description={description} setDescription={setDescription} price={price} setPrice={setPrice} posts={posts} setPosts={setPosts} token={token} location={location} setLocation={setLocation} willDeliver={willDeliver} setWillDeliver={setWillDeliver} userPosts={userPosts} setUserPosts={setUserPosts} postUserId={postUserId} setPostUserId={setPostUserId} />}></Route>
        <Route path="/profile" element={<Profile userId={userId} setUserId={setUserId} posts={posts} userPosts={userPosts} setUserPosts={setUserPosts} token={token} postUserId={postUserId} setPostUserId={setPostUserId} username={username} postIdToDelete={postIdToDelete} setPostIdToDelete={setPostIdToDelete} postId={postId} setPostId={setPostId} deleteHandler={deleteHandler} />}></Route>
      </Routes>
    </BrowserRouter>
  );
};


export default App;

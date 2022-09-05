import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Posts from "./Posts";
import Register from "./Register";
import Login from "./Login";
import CreatePost from "./CreatePost"

const App = () => {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [price, setPrice] = useState([])
  const [postId, setPostId] = useState(null);
  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="navbarLeft">
        <Link className="logo" to="/listings">The <br></br>Auction <br></br>Attic</Link>
        <form className="searchBar">
            <input placeholder="search..." type="text"></input>
            <button className="searchButton">Enter</button>
        </form>
        </div>
        <div className="loginLinks">
          <Link className="signup" to="/signup">
            Sign up
          </Link>
          <Link className="login" to="/login">
            Login
          </Link>
          <Link className="profile" to="/profile">My Profile
            <ul>
                <li><Link to="/myListings">My Listings</Link></li>
                <li><Link to="/addListing">Create Listing</Link></li>
                <li><Link to="/">Logout</Link></li>
            </ul>
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/signup" element={<Register username={username} setUsername={setUsername} setPassword={setPassword} password={password} setToken={setToken} />}></Route>
        <Route path="/login" element={<Login username={username} setUsername={setUsername} setPassword={setPassword} password={password} setToken={setToken}/>} ></Route>
        <Route
          path="/listings"
          element={<Posts posts={posts} setPosts={setPosts} token={token} postId={postId} setPostId={setPostId} />}
        ></Route>
        <Route path="/addListing" element={<CreatePost title={title} setTitle={setTitle} description={description} setDescription={setDescription} price={price} setPrice={setPrice} posts={posts} setPosts={setPosts} token={token} />}></Route>
        {/* <Route path=`/post${id}` element={<Post />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

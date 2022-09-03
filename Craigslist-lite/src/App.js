import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Posts from "./Posts";
import Register from "./Register";
import Login from "./Login";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/">Auction Attic</Link>
        <div className="loginLinks">
          <Link className="signup" to="/signup">
            Signup
          </Link>
          <Link className="login" to="/login">
            Login
          </Link>
          {/* <Link to="/profile">Profile</Link> */}
          <Link to="/posts">Posts</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Register username={username} setUsername={setUsername} setPassword={setPassword} password={password} setToken={setToken} />}></Route>
        <Route path="/login" element={<Login username={username} setUsername={setUsername} setPassword={setPassword} password={password} setToken={setToken}/>} ></Route>
        <Route
          path="/posts"
          element={<Posts posts={posts} setPosts={setPosts} />}
        ></Route>
        {/* <Route path=`/post${id}` element={<Post />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home"
import Posts from "./Posts"
import Register from "./Register";
import Login from "./Login";



const App = () => {
    const [posts, setPosts] = useState([]);
    return(
        <BrowserRouter>
            <nav className="navbar">
                <Link to="/">Auction Attic</Link>
                <div className="loginLinks">
                <Link to="/signup">Signup</Link>
                <Link to="/login">Login</Link>
                </div>
            </nav>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/signup" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/posts" element={<Posts
                  posts={posts}
                  setPosts={setPosts} />}>
                  </Route>
                {/* <Route path=`/post${id}` element={<Post />}></Route> */}
            </Routes>
        </BrowserRouter>
    )
}



export default App
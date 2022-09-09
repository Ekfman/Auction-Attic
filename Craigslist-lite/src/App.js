import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Posts from "./Posts";
import Register from "./Register";
import Login from "./Login";
import CreatePost from "./CreatePost";
import MyListings from "./MyListings";
import { fetchApiPosts, deletePostApi } from "./Api";
import Messages from "./Messages";

import { EditPost } from "./EditPost";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("Not Available");
  const [willDeliver, setWillDeliver] = useState(false);
  const [message, setMessage] = useState("");
  const [searchValue, setSearchValue] = useState("")

  const [token, setToken] = useState(window.localStorage.getItem("token") || "");
  useEffect(() => {
    window.localStorage.setItem("token", token)
  }, [token])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const apiData = await fetchApiPosts({ token });
        setPosts(apiData.data.posts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, [token]);

  const deleteHandler = async (deletedPostId) => {
    console.log("delete");
    try {
      const fetchDeletedPost = await deletePostApi({ deletedPostId });
      console.log(fetchDeletedPost);
      if (fetchDeletedPost) {
        const postsAfterDelete = posts.filter((post) => post._id !== deletedPostId);
        setPosts(postsAfterDelete)
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="navbarLeft">
          <Link className="logo" to="/listings">
            The <br></br>Auction <br></br>Attic
          </Link>
        </div>

        {token ? (
            <div className="loginLinks">
                <Link className="signup" to="/myListings">My Listings</Link>
                <Link className="login" to="/addListing">Create Listing</Link>
                <Link className="login" to="/messages">Messages</Link>
                <Link className="logout" to="/">Logout</Link>
            </div>
        ) : (
          <div className="loginLinks">
            <Link className="signup" to="/signup">
              Sign up
            </Link>
            <Link className="login" to="/login">
              Login
            </Link>
          </div>
        )}
      </nav>
      <Routes>
        <Route
          path="/signup"
          element={
            <Register
              username={username}
              setUsername={setUsername}
              setPassword={setPassword}
              password={password}
              setToken={setToken}
            />
          }
        ></Route>
        <Route
          path="/login"
          element={
            <Login
              username={username}
              setUsername={setUsername}
              setPassword={setPassword}
              password={password}
              setToken={setToken}
            />
          }
        ></Route>
        <Route
          path="/listings"
          element={
            <Posts
              posts={posts}
              deleteHandler={deleteHandler}
              message={message}
              setMessage={setMessage}
              token={token}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              setDescription={setDescription}
              setLocation={setLocation}
              setWillDeliver={setWillDeliver}
              setTitle={setTitle}
              setPrice={setPrice}
              setPosts={setPosts}
              willDeliver={willDeliver}
            />
          }
        ></Route>
        <Route
          path="/addListing"
          element={
            <CreatePost
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              price={price}
              setPrice={setPrice}
              posts={posts}
              setPosts={setPosts}
              token={token}
              location={location}
              setLocation={setLocation}
              willDeliver={willDeliver}
              setWillDeliver={setWillDeliver}
            />
          }
        ></Route>
        <Route
          path="/myListings"
          element={<MyListings posts={posts} deleteHandler={deleteHandler}  searchValue={searchValue}
          setSearchValue={setSearchValue} />}
        ></Route>
        <Route path="/messages" element={<Messages token={token} username={username} />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

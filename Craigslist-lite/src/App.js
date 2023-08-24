import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Posts from "./Posts";
import Register from "./Register";
import Login from "./Login";
import CreatePost from "./CreatePost";
import MyListings from "./MyListings";
import { fetchApiPosts, deletePostApi, profileApi } from "./Api";
import Messages from "./Messages";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("Not Available");
  const [willDeliver, setWillDeliver] = useState(false);
  const [message, setMessage] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [loggedInUserData, setLoggedInUserData] = useState([]);

  const [token, setToken] = useState(
    window.localStorage.getItem("token") || ""
  );
  useEffect(() => {
    window.localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    const fetchLoggedInUserData = async () => {
      try {
        const userData = await profileApi({ token });
        setLoggedInUserData(userData.data);
        console.log(userData.data);
      } catch (err) {
        console.error(err);
      }
    };
    token && fetchLoggedInUserData();
  }, [token]);

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
      const fetchDeletedPost = await deletePostApi({ token, deletedPostId });
      console.log(fetchDeletedPost);
      if (fetchDeletedPost) {
        const postsAfterDelete = posts.filter(
          (post) => post._id !== deletedPostId
        );
        setPosts(postsAfterDelete);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logoutHandler = () => {
    setToken("");
    setUsername("");
    setPassword("");
  };

  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="navbarLeft">
          <Link className="logo" to="/">
            The <br></br>Auction <br></br>Attic
          </Link>
        </div>

        {token ? (
          <div className="loginLinks">
            <a href="#" class="toggle-button">
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
            </a>
            <Link className="listings" to="/">
              Listings
            </Link>
            <Link className="signup" to="/myListings">
              My Listings
            </Link>
            <Link className="addListing" to="/addListing">
              Create Listing
            </Link>
            <Link className="addListing" to="/messages">
              Messages
            </Link>
            <Link className="logout" to="/" onClick={logoutHandler}>
              Logout
            </Link>
          </div>
        ) : (
          <div className="loginLinks">
            <Link className="listings" to="/">
              Listings
            </Link>
            <Link className="signup" to="/register">
              Register
            </Link>
            <Link className="login" to="/login">
              Login
            </Link>
          </div>
        )}
      </nav>
      <Routes>
        <Route
          path="/register"
          element={<Register setToken={setToken} />}
        ></Route>
        <Route path="/login" element={<Login setToken={setToken} />}></Route>
        <Route
          path="/"
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
          element={
            <MyListings
              posts={posts}
              deleteHandler={deleteHandler}
              searchValue={searchValue}
              token={token}
              setSearchValue={setSearchValue}
              setPosts={setPosts}
            />
          }
        ></Route>
        <Route
          path="/messages"
          element={
            <Messages
              token={token}
              setDescription={setDescription}
              setPrice={setPrice}
              setTitle={setTitle}
              setLocation={setLocation}
              setWillDeliver={setWillDeliver}
              willDeliver={willDeliver}
              setPosts={setPosts}
              posts={posts}
              loggedInUserData={loggedInUserData}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

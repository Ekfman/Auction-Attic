import { regAndLogAPI } from "./Api";
import { useNavigate } from "react-router";
import { useState } from "react";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const regOrLog = "login";
      const token = await regAndLogAPI(username, password, regOrLog);
      if (token) {
        setToken(token);
        navigate("/");
      } else {
        window.alert("Username or password incorrect, please try again.");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="formContainer">
      <form onSubmit={submitHandler}>
        <label>Username:</label>
        <br></br>
        <input
          className="formInput"
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          required
        ></input>
        <br></br>
        <label>Password:</label>
        <br></br>
        <input
          className="formInput"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        ></input>
        <br></br>
        <button className="buttonForm">Login</button>
      </form>
    </div>
  );
};

export default Login;

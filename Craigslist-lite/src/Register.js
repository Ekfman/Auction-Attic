import { useState } from "react";
import { regAndLogAPI } from "./Api";
import { useNavigate } from "react-router";

const Register = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!username) window.alert("Please type a username.");
      if (!password) window.alert("Please type a password.");
      if (!confirmPass) window.alert("Please retype your password");
      if (password !== confirmPass) {
        window.alert("passwords must match");
      } else {
        const regOrLog = "register";
        const token = await regAndLogAPI(username, password, regOrLog);
        if (token) {
          setToken(token);
          navigate("/");
        } else {
          window.alert("");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="formContainer">
      <form>
        <label>New Username:</label>
        <br></br>
        <input
          className="formInput"
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          required
        ></input>
        <br></br>
        <label>New Password:</label>
        <br></br>
        <input
          className="formInput"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        ></input>
        <br></br>
        <label>Confirm Password:</label>
        <br></br>
        <input
          className="formInput"
          onChange={(e) => setConfirmPass(e.target.value)}
          type="password"
          required
        ></input>
        <br></br>
        <button onClick={submitHandler} className="buttonForm">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Register;

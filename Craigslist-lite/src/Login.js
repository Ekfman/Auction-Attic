import { useState, useEffect } from "react";
import { regAndLogAPI } from "./Api";

const Login = ({ username, setUsername, password, setPassword, setToken }) => {
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const regOrLog = "login";
      const token = await regAndLogAPI(username, password, regOrLog);
      setToken(token);
      console.log(token);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="formContainer">
      <form onSubmit={submitHandler}>
        <label>Username:</label>
        <br></br>
        <input className="formInput"
          onChange={e => setUsername(e.target.value)}
          type="text"
          required
        ></input>
        <br></br>
        <label>Password:</label>
        <br></br>
        <input className="formInput"
          onChange={e => setPassword(e.target.value)}
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

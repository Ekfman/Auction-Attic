import { useState, useEffect } from "react";
import { newUserApi } from "./Api";

const Register = ({
  username,
  setUsername,
  password,
  setPassword,
  setToken,
}) => {
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        const regOrLog = "register"
      const token = await newUserApi(username, password, regOrLog);
      setToken(token);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="formContainer">
      <form onSubmit={submitHandler}>
        <label>New Username:</label>
        <br></br>
        <input className="formInput"
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          required
        ></input>
        <br></br>
        <label>New Password:</label>
        <br></br>
        <input className="formInput"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        ></input>
        <br></br>
        <label>Confirm Password:</label>
        <br></br>
        <input className="formInput" type="password" required></input>
        <br></br>
        <button className="buttonForm">Sign up</button>
      </form>
    </div>
  );
};

export default Register;

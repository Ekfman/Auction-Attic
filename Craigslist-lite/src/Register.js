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
      const token = await newUserApi({ username, password, regOrLog });
      setToken(token);
      console.log(token);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>New Username:</label>
        <br></br>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          required
        ></input>
        <br></br>
        <label>New Password:</label>
        <br></br>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        ></input>
        <br></br>
        <button>Enter</button>
      </form>
    </div>
  );
};

export default Register;

//for each new user, we need a token
//for each username and password must save it in the state

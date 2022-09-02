import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <form>
        <label>Username</label>
        <br></br>
        <input type="text"></input>
        <br></br>
        <label>Password</label>
        <br></br>
        <input type="text"></input>
        <br></br>
        <button>Enter</button>
      </form>
    </div>
  );
};

export default Register;

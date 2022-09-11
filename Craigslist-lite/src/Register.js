import { useState} from "react";
import { regAndLogAPI } from "./Api";
import { useNavigate } from "react-router";

const Register = ({setToken}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        const regOrLog = "register"
      const token = await regAndLogAPI(username, password, regOrLog);
      setToken(token);
      navigate("/listings")
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="formContainer">
      <form>
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
        <button onClick={submitHandler} className="buttonForm">Sign up</button>
      </form>
    </div>
  );
};

export default Register;

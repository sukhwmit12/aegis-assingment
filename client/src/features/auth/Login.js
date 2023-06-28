import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import FindFlight from "../flights/FindFlight";
import { Cookies } from "react-cookie";
const cookies = new Cookies();

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:3500/auth/login",
          JSON.stringify({
            username,
            password,
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((response) => {
          console.log(response.data["accessToken"]);
          cookies.set("token", response.data["accessToken"], { maxAge: 1*60 });
          navigate("/flight");
        })
        .catch((error) => {
          return error;
        });
    } catch (err) {
      if (!err.status) {
        alert("No Server Response");
      } else if (err.status === 400) {
        alert("Missing Username or Password");
      } else if (err.status === 401) {
        alert("Unauthorized");
      } else {
        alert(err.data?.message);
      }
    }
  }

  if (cookies.get("token")) {
    return <Link to="/flight"> Go to find flights! </Link>;
  }

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={loginUser}>
        <label for="source">Username:</label>
        <br />
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
        <br />
        <label for="source">Password:</label>
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <input type="submit" value="Login" />
      </form>

      <Link to="/signup"> New Here? Signup! </Link>
    </div>
  );
};

export default Login;

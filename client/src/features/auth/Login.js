import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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
          cookies.set("token", response.data["accessToken"], {
            maxAge: 15 * 60,
          });
          navigate("/flight");
          console.log(response.data);
        })
        .catch((error) => {
          alert(error);
        });
    } catch (err) {
      alert(err);
    }
  }

  if (cookies.get("token")) {
    return (
      <center>
        <Link to="/flight"> Go to find flights! </Link>
      </center>
    );
  }

  return (
    <div>
      <form onSubmit={loginUser}>
        <h2>Login</h2>
        {/* <label>Username:</label> */}
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
        />
        {/* <label>Password:</label> */}
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <input type="submit" value="Login" />
      </form>
      <Link to="/signup"> New Here? Signup! </Link>
    </div>
  );
};

export default Login;

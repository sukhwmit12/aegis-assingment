import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const NewUserForm = () => {
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios
        .post(
          "http://localhost:3500/user/add",
          JSON.stringify({ username, email, password }),
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error;
        });

      console.log(response?.data);

      setUsername("");
      setEmail("");
      setPassword("");
      alert("user added successfully");
    } catch (err) {
      alert(err);
    }
  }

  const content = (
    <div className="form signup">
      <form onSubmit={handleSubmit}>
        <h2>Sign-Up!</h2>
        {/* <label>Username:</label> */}
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
        />
        {/* <label>Email:</label> */}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        {/* <label>Password:</label> */}
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <input type="submit" value="Submit" />
      </form>
      <Link to="/">Already a user? Go to Login!</Link>
    </div>
  );

  return content;
};

export default NewUserForm;

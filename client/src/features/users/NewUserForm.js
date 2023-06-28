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
            // withCredentials: true,
          }
        )
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error;
        });

      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));

      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      if (!err?.response) {
        alert("No Server Response");
      } else if (err.response?.status === 409) {
        alert("Username Taken");
      } else {
        alert("Registration Failed");
      }
    }
  }

  const content = (
    <>
      <div className="new_flight_data">
        <h2>Sign up!</h2>
        <form onSubmit={handleSubmit}>
          <label> Username: </label>
          <br />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
          <br />
          <label> Email: </label>
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <br />
          <label> Password: </label>
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
        <p> Already a user? </p>
        <Link to="/"> Go to Login!</Link>
      </div>
    </>
  );

  return content;
};

export default NewUserForm;

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

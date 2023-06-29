import { useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import { Link } from "react-router-dom";

const cookies = new Cookies();

const FindFlight = () => {
  const [journeyDate, setJourneyDate] = useState("01-06-2023");
  const [departureAirport, setDepartureAirport] = useState("delhi");
  const [arrivalAirport, setArrivalAirport] = useState("hyderabad");
  const [flightsFound, setFlightsFound] = useState("");

  const token = cookies.get("token");

  async function handleSearch(event) {
    event.preventDefault();
    try {
      await axios
        .get(`http://localhost:3500/flight/find`, {
          params: {
            departureAirport,
            arrivalAirport,
            journeyDate,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setFlightsFound(response.data);
        })
        .catch((error) => alert(error));
    } catch (err) {
      alert(err);
    }
  }

  const displayForResult = (
    <div className="result">
      <h3>Flights Found!</h3>
      <p>
        {flightsFound ? (
          <ul>
            {Object.keys(flightsFound).map(function (key) {
              return (
                <li>
                  {key} : {flightsFound[key]}
                </li>
              );
            })}
          </ul>
        ) : (
          <p style={{ marginTop: "2rem" }}>There are no flights</p>
        )}
      </p>
    </div>
  );

  if (!cookies.get("token")) {
    return (
      <center>
        <Link to="/"> Go to login! </Link>
      </center>
    );
  }

  return (
    <div className="form findflight">
      <form inline onSubmit={handleSearch}>
        <h2>Find flights</h2>
        <label>Where from:</label>
        <select
          value={departureAirport}
          onChange={(e) => setDepartureAirport(e.target.value.toLowerCase())}
        >
          <option value="delhi">Delhi</option>
          <option value="hyderabad">Hyderabad</option>
          <option value="mumbai">Mumbai</option>
          <option value="chennai">Chennai</option>
        </select>
        <label>Where to:</label>
        <select
          value={arrivalAirport}
          onChange={(e) => setArrivalAirport(e.target.value.toLowerCase())}
        >
          <option value="delhi">Delhi</option>
          <option value="hyderabad">Hyderabad</option>
          <option value="mumbai">Mumbai</option>
          <option value="chennai">Chennai</option>
        </select>
        <label>When:</label>
        <input
          value={journeyDate}
          onChange={(e) => setJourneyDate(e.target.value)}
          type="date"
        />
        <input type="submit" value="Search" />
      </form>
      {flightsFound ? displayForResult : null}
    </div>
  );
};

export default FindFlight;

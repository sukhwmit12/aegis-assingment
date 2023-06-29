import { useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
const cookies = new Cookies();

const AddFlightData = () => {
  const defaultPrice = Math.floor(1000 + Math.random() * 9000);

  const [flightName, setFlightName] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [price, setPrice] = useState(`${defaultPrice}`);

  const token = cookies.get("token");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios
        .post(
          "http://localhost:3500/flight/add",
          {
            flightName,
            journeyDate,
            departureAirport,
            arrivalAirport,
            price,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          return response;
        })
        .catch((error) => {
          alert(error);
        });
      const data = await response;
      console.log(data);
    } catch (err) {
      alert(err);
    }
  }

  const content = (
    <div className="form newflightdata">
      <form onSubmit={handleSubmit}>
        <h2>Add New FLight Details</h2>
        <label>Flight Name:</label>
        <input
          value={flightName}
          onChange={(e) => setFlightName(e.target.value.toLowerCase())}
          type="text"
          placeholder="indigo, vistara etc"
        />
        <label>Date:</label>
        <input
          value={journeyDate}
          onChange={(e) => setJourneyDate(e.target.value)}
          type="date"
        />
        <label>Departure Airport:</label>
        <input
          value={departureAirport}
          onChange={(e) => setDepartureAirport(e.target.value.toLowerCase())}
          type="text"
          placeholder="Delhi"
        />
        <label>Arrival Airport:</label>
        <input
          value={arrivalAirport}
          onChange={(e) => setArrivalAirport(e.target.value.toLowerCase())}
          type="text"
          placeholder="Hyderabad"
        />
        <label>Price:</label>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          placeholder={defaultPrice}
        />
        <input type="submit" value="Add Flight" />
      </form>
    </div>
  );

  return content;
};

export default AddFlightData;

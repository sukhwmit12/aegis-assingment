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
    <>
      <div className="new_flight_data">
        <h2> Add New FLight Details</h2>
        <form onSubmit={handleSubmit}>
          <label for="source">Name:</label>
          <br />
          <input
            value={flightName}
            onChange={(e) => setFlightName(e.target.value.toLowerCase())}
            type="text"
            placeholder="indigo, vistara etc"
          />
          <br />
          <label for="source">Date:</label>
          <br />
          <input
            value={journeyDate}
            onChange={(e) => setJourneyDate(e.target.value)}
            type="date"
          />
          <br />
          <label for="source">Source:</label>
          <br />
          <input
            value={departureAirport}
            onChange={(e) => setDepartureAirport(e.target.value.toLowerCase())}
            type="text"
            placeholder="Delhi"
          />
          <br />
          <label for="source">Destination:</label>
          <br />
          <input
            value={arrivalAirport}
            onChange={(e) => setArrivalAirport(e.target.value.toLowerCase())}
            type="text"
            placeholder="Hyderabad"
          />
          <br />
          <label for="source">Price:</label>
          <br />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder={defaultPrice}
          />
          <br />
          <input type="submit" value="Add Flight" />
        </form>
      </div>
    </>
  );

  return content;
};

export default AddFlightData;

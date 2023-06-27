import { useState } from "react";
import { format } from "date-fns";

const AddFlightData = () => {
  const inte = Math.floor(1000 + Math.random() * 9000);
  const datetime = format(new Date(), "dd MMM, YYY pp");

  const [flightName, setFlightName] = useState("");
  const [journeyDate, setFJourneyDate] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [price, setPrice] = useState(`${inte}`);

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:3500/flight/add", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flightName,
        journeyDate,
        departureAirport,
        arrivalAirport,
        price,
      }),
    });

    const data = await response.json();
    console.log(data);
  }

  const content = (
    <>
      <div className="new_flight_data">
        <h2> Add New FLight Details</h2>
        <form onSubmit={handleSubmit}>
          <input
            value={flightName}
            onChange={(e) => setFlightName(e.target.value)}
            type="text"
            placeholder="indigo, vistara etc"
          />
          <br />
          <input
            value={journeyDate}
            onChange={(e) => setFJourneyDate(e.target.value)}
            type="date"
          />
          <br />
          <input
            value={departureAirport}
            onChange={(e) => setDepartureAirport(e.target.value)}
            type="text"
            placeholder="Delhi"
          />
          <br />
          <input
            value={arrivalAirport}
            onChange={(e) => setArrivalAirport(e.target.value)}
            type="text"
            placeholder="Hyderabad"
          />
          <br />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder={inte}
          />
          <br />
          <input type="submit" value="Add Flight" />
        </form>
      </div>
      <div className="diplay_end">
        <p>{datetime}</p>
      </div>
    </>
  );


  return content
  // const { flightName, journeyDate, departureAirport, arrivalAirport, price }
};

export default AddFlightData
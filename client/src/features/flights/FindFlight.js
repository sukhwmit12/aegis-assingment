import { useState } from "react";

const FindFlight = () => {
  const [items] = useState([
    {
      id: 1,
      checked: true,
      item: "One half pound bag of Cocoa Covered Almonds Unsalted",
    },
    {
      id: 2,
      checked: false,
      item: "Item 2",
    },
    {
      id: 3,
      checked: false,
      item: "Item 3",
    },
  ]);

  return (
    <>
      <h2>FLights found</h2>
      {items.length ? (
        <ul>
          {items.map((item) => (
            <li className="item" key={item.id} item={item} />
          ))}
        </ul>
      ) : (
        <p style={{ marginTop: "2rem" }}>
          There are no flights for this route.
        </p>
      )}
    </>
  );
};

// const { flightName, journeyDate, departureAirport, arrivalAirport, price }

export default FindFlight;

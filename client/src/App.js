import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import AddFlightData from "./features/flights/AddFlightData";
import FindFlight from "./features/flights/FindFlight";
import User from "./features/users/User";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="passengers">
            <Route index element={<User />} />
          </Route>
          <Route index element={<Login />} />
          <Route path="flight">
            <Route index element={<FindFlight />} />
          </Route>
          <Route path="new" element={<AddFlightData />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

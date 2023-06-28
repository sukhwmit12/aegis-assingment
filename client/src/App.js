// import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import FindFlight from "./features/flights/FindFlight";
import ErrorPage from "./components/ErrorPage";
import NewUserForm from "./features/users/NewUserForm";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="signup" element={<NewUserForm />} />
          <Route path="flight" element={<FindFlight />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

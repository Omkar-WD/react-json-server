import React from "react";
import { Routes, Route } from "react-router-dom";
import AddCity from "./AddCity/AddCity";
import AddCountry from "./AddCountry/AddCountry";
import EditCity from "./EditCity/EditCity";
import Home from "./Home/Home";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/add-city" element={<AddCity />}></Route>
      <Route path="/add-country" element={<AddCountry />}></Route>
      <Route path="/edit-city/:id" element={<EditCity />}></Route>
    </Routes>
  );
}

export default AllRoutes;

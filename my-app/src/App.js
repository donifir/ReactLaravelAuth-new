import React from "react";
import Axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import Registes from "./pages/auth/Registes";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";

Axios.defaults.baseURL = "http://localhost:8000";
Axios.defaults.headers.post["Conten-Type"] = "application/json"; //sama dengan postman di header ada Conten-Type dan Accept
Axios.defaults.headers.post["Accept"] = "application/json";

Axios.interceptors.request.use(function(config){ //cara agara logout tidak Unauthenticated
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}`:'';
  return config;
})


export default function App() {
  return (
    <BrowserRouter>
    {/* <NavbarComponent/> */}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Registes />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}

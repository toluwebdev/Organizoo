import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import MainLoader from "./pages/MainLoader";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import VerifyOtp from "./pages/auth/VerifyOtp";

const App = () => {
  let [loader, setLoader] = useState(true);
  let router = useLocation();

  useEffect(() => {
    setTimeout(() => setLoader(false), 1500);
  }, []);
  if (loader) {
    return <MainLoader />;
  }
  return (
    <div>
      {router.pathname === "/login" ||
      router.pathname === "/signup" ||
      router.pathname === "/verify-otp" ? (
        ""
      ) : (
        <Nav />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;

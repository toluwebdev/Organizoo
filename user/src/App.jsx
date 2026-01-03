import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import MainLoader from "./pages/MainLoader";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import VerifyOtp from "./pages/auth/VerifyOtp";
import Notfound from "./pages/Notfound";
import ResetPassword from "./pages/auth/ResetPassword";
import { useAppContext } from "./context/AppContext";
import Index from "./pages";

const App = () => {
  let [loader, setLoader] = useState(true);
  let router = useLocation();
  const { color } = useAppContext();
  useEffect(() => {
    setTimeout(() => setLoader(false), 1500);
  }, []);
  if (loader) {
    return <MainLoader />;
  }
  return (
    <div
      className="min-h-screen transition-all duration-500"
      style={{
        backgroundColor: color.backGround,
      }}
    >
      {router.pathname === "/login" ||
      router.pathname === "/signup" ||
      router.pathname === "/verify-otp" ||
      router.pathname === "/resetPassword" ? (
        ""
      ) : (
        <Nav />
      )}

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
};

export default App;

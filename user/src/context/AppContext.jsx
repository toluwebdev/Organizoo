import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const AppProvider = createContext();
const backendUrl = import.meta.env.VITE_APP_API_URL;

const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

let blackMode = {
  backGround: "#000",
  primaryColor: "#0B8F76",
  secondaryColor: "#C0E2C9",
  textColor: "white",
};
const whiteMode = {
  backGround: "#FFFFFF",
  primaryColor: "#0B8F76",
  secondaryColor: "#C0E2C9",
  textColor: "black",
};

const AppContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mode, setMode] = useState(false);

  const [userData, setUserData] = useState({});

  const [color, setColor] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    mode ? setColor(blackMode) : setColor(whiteMode);
  }, [mode]);

  let getAuthState = async () => {
    try {
      const { data } = await api.get("/auth/isAuthenticated");
      if (data.success) {
        setIsLogin(true);

        getUserData();
      }
    } catch (err) {
      // navigate("/login");
      console.log(err);
    }
  };
  const getUserData = async () => {
    try {
      const { data } = await api.get("/auth/userDetails");
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch user");
    }
  };
  const logout = async () => {
    try {
      const { data } = await api.get("/auth/logout");
      if (data.success) {
        toast.success(data.message);
        setIsLogin(false);
        setUserData({});
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch user");
    }
  };
  useEffect(() => {
    getAuthState();
  }, []);
  const value = {
    isLogin,
    color,
    setColor,
    mode,
    setMode,
    api,
    logout,
    setUserData,
    setIsLogin,
    getAuthState,
    axios,
    isAuthenticated,
    userData,
    setIsAuthenticated,
  };
  return <AppProvider.Provider value={value}>{children}</AppProvider.Provider>;
};

export const useAppContext = () => {
  return useContext(AppProvider);
};

export default AppContextProvider;

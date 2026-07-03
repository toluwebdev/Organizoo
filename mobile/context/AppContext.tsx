import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios, { AxiosError } from "axios";
import { Vibration } from "react-native";
import { router } from "expo-router";

// 1. Define strict TypeScript interfaces for your Context state and arguments
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthCredentials {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

interface AppContextType {
  user: User | null;
  emailVerificationLoading: boolean;
  setEmailVerificationLoading: (val: boolean) => void;
  setUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  signUp: (credentials: Required<AuthCredentials>) => Promise<void>;
  resendEmailVerificationOtp: () => Promise<void>;
  login: (
    credentials: Omit<AuthCredentials, "firstName" | "lastName">,
  ) => Promise<void>;
  VerifyEmail: (otp: string) => Promise<void>;
  isLoginEmailError: boolean;
  setIsLoginEmailError: (val: boolean) => void;
  isLoginPasswordError: boolean;
  setIsLoginPasswordError: (val: boolean) => void;
  isSignUpEmailError: boolean;
  setShowSuccess: (val: boolean) => void;
  showSuccess: boolean;
  loginLoading: boolean;
  setLoginLoading: (val: boolean) => void;
  signUpLoading: boolean;
  setSignUpLoading: (val: boolean) => void;
  setIsSignUpEmailError: (val: boolean) => void;
  isSignUpPasswordError: boolean;
  setIsSignUpPasswordError: (val: boolean) => void;
}

interface ApiErrorResponse {
  type: "validation" | "email" | "password";
  message: string;
}

// 2. Initialize context with undefined (handled nicely by custom hook)
const AppContext = createContext<AppContextType | undefined>(undefined);

const api = axios.create({ baseURL: "http://192.168.18.3:5000/api" });

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Error States
  const [isLoginEmailError, setIsLoginEmailError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoginPasswordError, setIsLoginPasswordError] = useState(false);
  const [emailVerificationLoading, setEmailVerificationLoading] =
    useState(false);
  const [isSignUpEmailError, setIsSignUpEmailError] = useState(false);
  const [isSignUpPasswordError, setIsSignUpPasswordError] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);
  // 3. Reset helper to clear visual errors on new form submissions
  const resetErrors = () => {
    setIsLoginEmailError(false);
    setIsLoginPasswordError(false);
    setIsSignUpEmailError(false);
    setIsSignUpPasswordError(false);
  };

  // Sign Up Action
  const signUp = async ({
    firstName,
    lastName,
    email,
    password,
  }: Required<AuthCredentials>) => {
    setSignUpLoading(true);
    resetErrors(); // Clear old UI flags
    try {
      const { data } = await api.post("/auth/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      setToken(data.token);
      router.push("/(main)/auth/verify-email");
    } catch (error) {
      Vibration.vibrate(500);
      const err = error as AxiosError<ApiErrorResponse>;

      if (err.response && err.response.data) {
        const errorData = err.response.data;
        if (errorData.type === "validation") {
          setIsSignUpEmailError(true);
          setIsSignUpPasswordError(true);
        }
        if (errorData.type === "email") {
          setIsSignUpEmailError(true);
        }
      } else {
        console.log("Network/General Error:", err.message);
      }
    } finally {
      setSignUpLoading(false);
    }
  };

  // Login Action
  const login = async ({
    email,
    password,
  }: Omit<AuthCredentials, "firstName" | "lastName">) => {
    resetErrors(); // Clear old UI flags
    setLoginLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });

      // FIX: Commit actual server response to state so user gets logged in!
      setToken(data.token);
      if (data.otpRequired) {
        router.push("/(main)/auth/verify-email");
      } else {
        router.push("/(main)/(tabs)/home");
      }
    } catch (error) {
      Vibration.vibrate(500);
      const err = error as AxiosError<ApiErrorResponse>;

      if (err.response && err.response.data) {
        const errorData = err.response.data;
        if (errorData.type === "validation") {
          setIsLoginEmailError(true);
          setIsLoginPasswordError(true);
        }
        if (errorData.type === "email") {
          setIsLoginEmailError(true);
        }
        if (errorData.type === "password") {
          setIsLoginPasswordError(true);
        }
        console.log("Server Message:", errorData.message);
      } else {
        console.log("Network/General Error:", err.message);
      }
    } finally {
      setLoginLoading(false);
    }
  };
  const resendEmailVerificationOtp = async () => {
    try {
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };
      const { data } = await api.post("/auth/sendEmailOtp", null, config);
      if (data.success) {
        console.log(data.message);
      }
    } catch (error) {
      Vibration.vibrate(500);
      const err = error as AxiosError<ApiErrorResponse>;
      if (err.response && err.response.data) {
        console.log(
          "An error occured while sending",
          err.response.data.message,
        );
      }
    }
  };
  // Verify Email Action
  const VerifyEmail = async (otp: string) => {
    setEmailVerificationLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };
      const { data } = await api.post("/auth/verifyEmail", { otp }, config);
      if (data.success) {
        setShowSuccess(true);
      }
    } catch (error) {
      Vibration.vibrate(500);
      const err = error as AxiosError<ApiErrorResponse>;
      if (err.response && err.response.data) {
        console.log(
          "An error occured while verifying email",
          err.response.data.message,
        );
      }
    } finally {
      setEmailVerificationLoading(false);
    }
  };
  return (
    <AppContext.Provider
      value={{
        user,
        signUpLoading,
        setSignUpLoading,
        loginLoading,
        setLoginLoading,
        VerifyEmail,
        resendEmailVerificationOtp,
        setUser,
        token,
        setToken,
        signUp,
        setShowSuccess,
        showSuccess,
        login,
        emailVerificationLoading,
        setEmailVerificationLoading,
        isLoginEmailError,
        setIsLoginEmailError,
        isLoginPasswordError,
        setIsLoginPasswordError,
        isSignUpEmailError,
        setIsSignUpEmailError,
        isSignUpPasswordError,
        setIsSignUpPasswordError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 4. Safe Consumer Hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

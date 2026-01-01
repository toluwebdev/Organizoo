import { useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { MdOutlineEmail } from "react-icons/md";
import { FaLock, FaUserTie } from "react-icons/fa";

let SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { api, getAuthState } = useAppContext();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/signup", {
        name,
        email,
        password,
      });
      if (data.success) {
        toast.success(data.message);
        getAuthState();
        navigate("/verify-otp");
      } else {
        toast.error(data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  const googleAuth = () => {
    window.open(
      `${import.meta.env.VITE_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };
  return (
    <div className="flex h-[700px] w-full">
      <div className="w-full hidden md:inline-block">
        <img
          className="h-full justify-center items-center object-contain flex"
          src={assets.homeImage}
          alt="leftSideImage"
        />
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="md:w-96 w-80 flex flex-col items-center justify-center"
        >
          <h2 className="text-4xl text-gray-900 font-medium">Sign up</h2>
          <p className="text-sm text-gray-500/90 mt-3">
            Get Started ! Please sign in to get started
          </p>

          <button
            type="button"
            onClick={googleAuth}
            className="w-full mt-8 cursor-pointer  bg-gray-500/5 flex gap-5  items-center justify-center h-12 rounded-full"
          >
            <img src={assets.google} className="h-7" alt="googleLogo" />
            <h3>Continue with Google</h3>
          </button>

          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="w-full text-nowrap text-sm text-gray-500/90">
              or sign in with email
            </p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div>

          <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <FaUserTie />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
            />
          </div>
          <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <MdOutlineEmail />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email id"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
            />
          </div>

          <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <FaLock />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
            />
          </div>

          <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
            <div className="flex items-center gap-2">
              <input className="h-5" type="checkbox" id="checkbox" />
              <label className="text-sm" htmlFor="checkbox">
                Remember me
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-8 w-full h-11 relative flex justify-center items-center rounded-full text-white bg-secondary-dark hover:opacity-90 transition-opacity"
          >
            {isLoading && (
              <div className="size-8 rounded-full  border-t-2 absolute animate-spin"></div>
            )}
            {!isLoading && "Sign Up"}
          </button>
          <p className="text-gray-500/90 text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default SignUp;

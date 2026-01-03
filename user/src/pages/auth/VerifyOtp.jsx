import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const VerifyOtp = () => {
  const { userData, api } = useAppContext();
  const router = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (userData.isVerified) {
      router("/");
    }
  }, []);
  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");
      const { data } = await api.post("/auth/verifyOtp", { otp });
      console.log(data);
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      onPaste={handlePaste}
      className="min-h-screen  flex justify-center  items-center"
    >
      <div className="flex flex-col  rounded-2xl min-w-md shadow-2xl p-10 justify-center items-center">
        <h1 className="text-2xl font-bold text-[#16CC95]">Verify OTP</h1>
        <p className="text-sm mt-3 text-gray-600 text-center">
          Enter the six digit code sent to {userData.email}
        </p>
        <div
          onPaste={handlePaste}
          className="flex justify-center items-center gap-3"
        >
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength={1}
                className="w-12 h-12  text-black border mt-5 text-center text-xl rounded-md  "
                key={index}
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#16CC95] flex justify-center items-center text-white rounded-xl cursor-pointer mt-5 p-3 w-full"
        >
          {isLoading ? (
            <div className="size-8 rounded-full  border-t-2 absolute animate-spin"></div>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
};

export default VerifyOtp;

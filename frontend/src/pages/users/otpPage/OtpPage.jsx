import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom"
import { toast } from "react-hot-toast";
import resendOtp from "../../../services/getOtpPage";
import log from "../../../utils/logger"
import verifyOtp from "../../../services/verifyOtp";
import { setUser } from "../../../store/authSlice";

function OtpPage() {
  const { email } = useSelector((state) => state.auth.user);
  const dispatch=useDispatch()

  const [otp, setOtp] = useState("");
  const [expiresAt, setExpiresAt] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate =useNavigate()
  // Restore expiresAt from localStorage on refresh
  useEffect(() => {
    const raw = localStorage.getItem("otpExpiresAt");
    if (!raw) return;

    const parsed = Number(raw);
    if (isNaN(parsed)) {
      localStorage.removeItem("otpExpiresAt");
      return;
    }

    setExpiresAt(parsed);
  }, []);

  //  Drive timer from expiresAt
  useEffect(() => {
    if (!expiresAt) return;

    const tick = () => {
      const remaining = Math.max(
        0,
        Math.floor((expiresAt - Date.now()) / 1000)
      );
      setTimeLeft(remaining);
    };

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  // ✅ Submit OTP
  const handleSubmit = async() => {
    try {
        if (otp.length < 6) {
            toast.error("Must enter the valid otp.");
            return;
        }
        console.log("OTP submitted:", otp);
        // verify OTP API
        const response=await verifyOtp({otp:otp})
        console.log("response in the verify otp : ",response)
        if(response.success){
            toast.success(response.message)
            dispatch(setUser(response.data.user))
            navigate(-1)
        }else if(!response.success){
            toast.error(response.message)
        }else{
            toast.error(response.message)
        }
    } catch (error) {
        log.error("error in the verify otp : ",error)
    }

  };

  // 🔁 Resend OTP
  const handleResend = async () => {
    try {
      setLoading(true);

      const response = await resendOtp();

      if (response?.success) {
        const newExpiresAt =
          Date.now() + response.data.expiresAt * 1000;

        localStorage.setItem("otpExpiresAt", newExpiresAt);
        setExpiresAt(newExpiresAt); // 🔥 THIS fixes the flicker

        setOtp("")

        toast.success("OTP resent successfully");
      }
    } catch (err) {
        log.error(err)
      toast.error("Please wait before resending OTP",);
    } finally {
      setLoading(false);
    }
  };

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-semibold text-center">
          Verify OTP
        </h2>

        <p className="text-sm text-center mt-2 text-gray-500">
          Enter the OTP sent to <b>{email}</b>
        </p>

        {/* ⏱ Timer */}
        {timeLeft > 0 && (
          <p className="text-center mt-2 text-sm text-orange-500">
            OTP expires in {formatTime(timeLeft)}s
          </p>
        )}

        <input
          type="text"
          value={otp}
          maxLength={6}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          placeholder="Enter OTP"
          className="mt-6 w-full rounded-lg px-4 py-2 border"
        />

        <button disabled={timeLeft === 0 || loading}
          onClick={handleSubmit}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg"
        >
          Submit OTP
        </button>

        {/* 🔁 Resend */}
        {timeLeft === 0 ? (
          <button
            disabled={loading}
            onClick={handleResend}
            className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            {loading ? "Resending..." : "Resend OTP"}
          </button>
        ) : (
          <p className="mt-3 text-center text-sm text-gray-400">
            Wait {formatTime(timeLeft)}s to resend OTP
          </p>
        )}
      </div>
    </div>
  );
}

export default OtpPage;

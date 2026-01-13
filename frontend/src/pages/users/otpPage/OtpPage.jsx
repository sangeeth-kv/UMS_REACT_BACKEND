import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import resendOtp from "../../../services/getOtpPage";
import log from "../../../utils/logger";
import verifyOtp from "../../../services/verifyOtp";
import { setUser } from "../../../store/authSlice";
import Layout from "../../../components/Layout/Layout"; // import Layout

function OtpPage() {
  const { email } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [expiresAt, setExpiresAt] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  // Drive timer from expiresAt
  useEffect(() => {
    if (!expiresAt) return;

    const tick = () => {
      const remaining = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
      setTimeLeft(remaining);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  const handleSubmit = async () => {
    try {
      if (otp.length < 6) {
        toast.error("Must enter the valid OTP.");
        return;
      }

      const response = await verifyOtp({ otp });
      if (response.success) {
        toast.success(response.message);
        dispatch(setUser(response.data.user));
        navigate(-1);
        
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      log.error("Error in verify OTP: ", error);
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);
      const response = await resendOtp();
      if (response?.success) {
        const newExpiresAt = Date.now() + response.data.expiresAt * 1000;
        localStorage.setItem("otpExpiresAt", newExpiresAt);
        setExpiresAt(newExpiresAt);
        setOtp("");
        toast.success("OTP resent successfully");
      }
      
    } catch (err) {
      log.error(err);
      toast.error("Please wait before resending OTP");
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
      <div className="flex flex-col items-center justify-center flex-1 mt-6">
        <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
            Verify OTP
          </h2>

          <p className="text-sm text-center mt-2 text-gray-500 dark:text-gray-300">
            Enter the OTP sent to <b>{email}</b>
          </p>

          {/* Timer */}
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
            className="mt-6 w-full rounded-lg px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            disabled={timeLeft === 0 || loading}
            onClick={handleSubmit}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
          >
            Submit OTP
          </button>

          {timeLeft === 0 ? (
            <button
              disabled={loading}
              onClick={handleResend}
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
            >
              {loading ? "Resending..." : "Resend OTP"}
            </button>
          ) : (
            <p className="mt-3 text-center text-sm text-gray-400 dark:text-gray-400">
              Wait {formatTime(timeLeft)}s to resend OTP
            </p>
          )}
        </div>
      </div>
  );
}

export default OtpPage;

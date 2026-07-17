import { useState } from "react";
import axiosInstance from "../lib/axiosinstance";

const OTPDialog = ({ open, pendingUser, onSuccess, onClose }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleVerify = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.post("/user/verify-otp", {
        userId: pendingUser.userId,
        otp,
        deviceId: pendingUser.deviceId,
      });

      onSuccess(response.data.result);

    } catch (error) {
      alert(
        error.response?.data?.message || "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-background p-6 rounded-xl w-[400px] shadow-xl">

        <h2 className="text-2xl font-bold mb-4">
          Verify Login
        </h2>

        <p className="text-muted-foreground mb-4">
          Enter the OTP sent to your email.
        </p>

        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Enter 6-digit OTP"
        />

        <div className="flex gap-2 justify-end">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded border"
          >
            Cancel
          </button>

          <button
            onClick={handleVerify}
            disabled={loading}
            className="px-4 py-2 rounded bg-red-600 text-white"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default OTPDialog;
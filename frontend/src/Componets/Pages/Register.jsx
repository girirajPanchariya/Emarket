import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Send OTP
  const sendOtp = async () => {
    if (!form.email) return alert("Please enter your email first!");

    try {
      setLoading(true);
      await axios.post("https://emarket-1-ai90.onrender.com/user/verify", {
        email: form.email,
      });
      setOtpSent(true);
      alert("OTP sent to your email. It expires in 5 minutes.");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const UserRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    const { name, email, password, phone, otp } = form;
    if (!name || !email || !password || !phone || !otp)
      return alert("All fields are required");

    try {
      setLoading(true);
      const res = await axios.post(
        "https://emarket-1-ai90.onrender.com/user/register",
        form
      );
      alert(res.data.message);

      // Reset form
      setForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        otp: "",
      });
      setOtpSent(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="w-full h-screen flex justify-center items-center bg-[rgb(240,229,208)]">
        <div className="bg-[rgb(100,4,57)] h-full p-4 rounded-lg shadow-md w-[50%] overflow-hidden">
          <h1 className="text-2xl font-bold text-center mb-2 bg-amber-400 p-2 rounded">
            User Registration
          </h1>

          <form
            onSubmit={UserRegister}
            className="space-y-2 p-4 bg-[rgb(64,155,135)] rounded-lg border max-w-lg mx-auto"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            {!otpSent && (
              <button
                type="button"
                onClick={sendOtp}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            )}

            {otpSent && (
              <>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={form.otp}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={loading}
                  className="w-full bg-blue-500 text-white py-2 rounded"
                >
                  {loading ? "Resending..." : "Resend OTP"}
                </button>
              </>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

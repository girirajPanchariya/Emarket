import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Fetch logged-in user from backend
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        "https://emarket-1-ai90.onrender.com/user/user",
        { withCredentials: true }
      );
      setUser(res.data.user);
      localStorage.setItem("userInfo", JSON.stringify(res.data.user)); // persist
    } catch (error) {
      console.log(error);
      setUser(null);
      localStorage.removeItem("userInfo");
    }
  };

  // Logout handler
  const logoutHandler = async () => {
    try {
      const response = await axios.get(
        "https://emarket-1-ai90.onrender.com/user/logout",
        { withCredentials: true }
      );

      alert(response.data.message);

      // Store last username to show after logout
      if (response.data.name) {
        localStorage.setItem("lastUser", response.data.name);
      }

      // Clear auth info
      setUser(null);
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");

      navigate("/login");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Logout failed");
    }
  };

  // On mount: load user from localStorage or fetch
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      fetchUser();
    }
  }, []);

  // Display either current user or last user after logout
  const displayName =
    user?.name || localStorage.getItem("lastUser") || "User";

  return (
    <div className="h-11 w-full bg-amber-500 rounded-b-md p-0 grid grid-cols-3">
      {/* Left */}
      <div className="flex items-center shadow-xl shadow-amber-200 rounded-md px-5">
        <h1 className="text-2xl font-bold">Product-Saler</h1>
      </div>

      {/* Center */}
      <div className="flex items-center justify-center shadow-xl shadow-amber-200 rounded-md">
        <h1 className="text-2xl font-bold">Product-Saler</h1>
      </div>

      {/* Right / User Menu */}
      <div className="relative group flex items-center justify-end shadow-xl shadow-amber-200 rounded-md px-5">
        <div className="bg-amber-300 px-3 py-1 rounded-2xl cursor-pointer">
          {displayName}
        </div>

        {/* Dropdown */}
        <div className="absolute top-full right-0 mt-2 p-4 bg-white rounded-xl shadow-2xl hidden group-hover:block w-40">
          {!user ? (
            <>
              <div className="px-4 py-2 rounded-md hover:bg-amber-200 cursor-pointer">
                <Link to="/login">Login</Link>
              </div>
              <div className="px-4 py-2 rounded-md hover:bg-amber-200 cursor-pointer">
                <Link to="/register">Register</Link>
              </div>
            </>
          ) : (
            <>
              <div
                className="px-4 py-2 rounded-md hover:bg-amber-200 cursor-pointer"
                onClick={logoutHandler}
              >
                Logout
              </div>
              <div className="px-4 py-2 rounded-md hover:bg-amber-200 cursor-pointer">
                <Link to="/profile">Profile</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { User } from "@supabase/supabase-js";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const { data, error } = await supabase.auth.getUser();

        if (error || !data?.user) {
          console.error("Error fetching user:", error?.message);
          navigate("/login");
          return;
        }

        setUser(data.user);
      } catch (err) {
        console.error("Unexpected error:", err);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Dashboard
        </h2>

        {user ? (
          <div className="text-center">
            <p className="text-lg font-medium text-gray-700">
              Welcome, <span className="text-blue-600">{user.email}</span>
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}

        <button
          onClick={handleLogout}
          className="w-full mt-6 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all localStorage or specific token
    localStorage.removeItem("token");
    // You can also clear everything: localStorage.clear();

    // Optional: add a small delay before redirecting
    setTimeout(() => {
      navigate("/login"); // Redirect to login page
    }, 1000);
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
      <h4>Logging you out...</h4>
    </div>
  );
};

export default Logout;

import React, { useState, useEffect } from "react";
import router from "./Router";

const ProtectedRoute = ({ element }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userDetails");

    if (!storedUser) {
      setIsAuthenticated(false);
      router.navigate("/login"); // Redirect without Navigate
      return;
    }

    try {
      const userDetails = JSON.parse(atob(storedUser));
      if (!userDetails || userDetails.role?.id !== 1) {
        setIsAuthenticated(false);
        router.navigate("/login"); // Redirect
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error parsing user details:", error);
      setIsAuthenticated(false);
      router.navigate("/login"); // Redirect on error
    }
  }, []);

  if (isAuthenticated === null) return null; // Prevent flickering
  return isAuthenticated ? element : null; // Don't use Navigate
};

export default ProtectedRoute;

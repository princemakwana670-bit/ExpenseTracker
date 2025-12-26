import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/auth/check");
        setIsAuth(true);
      } catch {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return isAuth ? children : <Navigate to="/login" />;
}

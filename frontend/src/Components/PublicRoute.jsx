// components/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // 👈 optional loading screen

  return user ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;

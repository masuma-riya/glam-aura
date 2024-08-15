import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({ children }) => {
  // Loader and user
  const { user, loading } = useAuth();

  // Go to clicked route after login
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRoute;

import { Navigate, Outlet } from "react-router-dom";
import { useAuthProvider } from "../context/AuthContext";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuthProvider();

  if (isAuthenticated === null) return <p>Loading...</p>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;

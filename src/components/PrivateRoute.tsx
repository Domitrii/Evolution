import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext/useAuth";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/signup" replace />; // or "/login"
  }
  return children;
};

export default PrivateRoute;
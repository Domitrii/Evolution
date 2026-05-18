import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../redux/auth/selectors";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const token = useSelector(selectToken)

  if (!token) return <Navigate to="/login" />
  return children

};

export default PrivateRoute;
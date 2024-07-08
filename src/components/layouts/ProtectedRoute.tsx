import { Navigate, useLocation } from "react-router-dom";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

interface IProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<IProps> = ({ children }) => {
  const token = useAppSelector(useCurrentToken);
  const location = useLocation();

  // Enhanced logging
  console.log("Current location:", location);
  console.log("Current token:", token);

  if (!token) {
    console.log("No token found, redirecting to login.");
    return <Navigate to="/login" replace={true} state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;

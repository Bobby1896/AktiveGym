import { Navigate } from "react-router-dom";
import { isLoggedIn} from ".";

const PrivateRoute = ({ children }) => {
  if (!isLoggedIn()) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;

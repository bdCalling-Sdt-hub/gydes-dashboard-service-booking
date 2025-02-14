/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { decodedToken } from "../utils/jwt";

function ProtectedRoute({ children, role }) {
  const token = Cookies.get("gydes_accessToken");
  const user = decodedToken(token);

  if (!user || user?.role !== role) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;

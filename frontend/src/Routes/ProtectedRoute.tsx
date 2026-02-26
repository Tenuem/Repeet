import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../Context/authContext";

type Props = { children: React.ReactNode };

const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation();
  const { isLoggedIn } = useAuthContext();

  return isLoggedIn() ? ( 
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
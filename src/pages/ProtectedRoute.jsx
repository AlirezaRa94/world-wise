import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";

import { useAuth } from "../contexts/FakeAuthContext";

ProtectedRoute.propTypes = {
  children: propTypes.node,
};

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;

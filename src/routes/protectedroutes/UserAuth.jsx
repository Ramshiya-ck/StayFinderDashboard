import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../components/AuthHook/Authcontext";
import { Outlet, useNavigate } from "react-router-dom";

export const UserAuth = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // or a loader/spinner until redirect happens
  }

  return <Outlet />;
};

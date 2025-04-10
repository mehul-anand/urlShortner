import { UrlState } from "@/context";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { BarLoader } from "react-spinners";

function NeedAuth({ children }) {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = UrlState();
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate(`/auth`);
    }
  }, [isAuthenticated, loading]);
  if (loading) {
    return <BarLoader width={"100%"} color="#846eee" />;
  }
  if (isAuthenticated) {
    return children;
  }
  return <div>NeedAuth</div>;
}

export default NeedAuth;

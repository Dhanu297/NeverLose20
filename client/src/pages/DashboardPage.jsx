import React, { useContext } from "react"; //
import { AuthContext } from "../context/AuthContext";
import DashBoard from "../components/dashboard/Dashboard";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";

const DashboardPage = () => {
  // Destructure everything we need from our custom logic hooks
  const { loading: authLoading } = useContext(AuthContext);

  if (authLoading) return <LoadingSpinner message="Authenticating..." />;

  return <DashBoard />;
};

export default DashboardPage;

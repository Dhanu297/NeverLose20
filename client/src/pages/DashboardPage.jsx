import React, { useContext } from "react"; //
import { AuthContext } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout/MainLayout";
import WelcomeState from "../components/welcomeState/WelcomeState";
import ItemsList from "../components/itemsList/ItemsList";
import { useDashboard } from "../hooks/useDashboard";
import DashBoard from "../components/dashboard/Dashboard";
const DashboardPage = () => {
  // Destructure everything we need from our custom logic hooks
  const { user, loading: authLoading } = useContext(AuthContext);

  if (authLoading) return <LoadingSpinner message="Authenticating..." />;

  return (
    /*<MainLayout username="Sarah">
      {loading ? (
        <div className="text-white text-center">Loading...</div>
      ) : items.length === 0 ? (
        <WelcomeState username="Sarah" onCreateClick={handleCreate} />
      ) : (
        <ItemsList
          items={items}
          onCreateClick={handleCreate}
          onDetailClick={handleDetail}
        />
      )}
    </MainLayout>*/
    <DashBoard />
  );
};

export default DashboardPage;

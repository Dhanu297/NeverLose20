import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ItemsList from "../itemsList/ItemsList";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import { useDashboard } from "../../hooks/useDashboard";
import WelcomeState from "../welcomeState/WelcomeState";
import { useEffect } from "react";
function Dashboard() {
  const { items, loading: itemsLoading, handleCreate, handleGoToDetail } = useDashboard();
  const { user, loading: authLoading } = useContext(AuthContext); // Get authLoading
  const navigate = useNavigate();

  // 1. Wait for Auth to finish initialization
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  // 2. While checking auth, show a loader (don't redirect yet!)
  if (authLoading) {
    return <div className="text-white text-center">Checking session...</div>;
  }

  // 3. If no user, return null while the useEffect redirect kicks in
  if (!user) return null;

  return (
    <MainLayout username={user?.displayName || "User"}>
      <div fluid className="px-0">
        {itemsLoading ? (
          <div className="text-white text-center">Loading items...</div>
        ) : !items || items.length === 0 ? (
          <WelcomeState onCreateClick={handleCreate} />
        ) : (
          <ItemsList
            items={items}
            onCreateClick={handleCreate}
            onDetailClick={handleGoToDetail}
          />
        )}
      </div>
    </MainLayout>
  );
}

export default Dashboard;

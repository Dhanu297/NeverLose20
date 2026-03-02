import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ItemsList from "../itemsList/ItemsList";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import { useDashboard } from "../../hooks/useDashboard";
import WelcomeState from "../welcomeState/WelcomeState";

function Dashboard() {
  const { items, loading, handleCreate, handleDetail } = useDashboard();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <MainLayout username={user?.displayName || "User"}>
      <div fluid className="px-0">
        {loading ? (
          <div className="text-white text-center">Loading items...</div>
        ) : !items || items.length === 0 ? (
          <WelcomeState onCreateClick={handleCreate} />
        ) : (
          <ItemsList
            items={items}
            onCreateClick={handleCreate}
            onDetailClick={handleDetail}
          />
        )}
      </div>
    </MainLayout>
  );
}

export default Dashboard;

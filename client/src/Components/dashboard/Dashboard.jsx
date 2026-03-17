import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ItemsList from "../itemsList/ItemsList";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import { useDashboard } from "../../hooks/useDashboard";
import WelcomeState from "../welcomeState/WelcomeState";
import CustomButton from "../CustomButton/CustomButton";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

function Dashboard() {
  const {
    itemsWithReports,
    loading,
    handleCreate,
    handleItemDetails,
    handleReportsList,
  } = useDashboard();
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
          <LoadingSpinner />
        ) : itemsWithReports.length === 0 ? (
          <WelcomeState onCreateClick={handleCreate} />
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4 px-2">
              <h2 className="text-white fw-bold mb-0">My Secure Tags</h2>
              <CustomButton
                onClick={handleCreate}
                className="btn-red btn-sm px-4"
              >
                Add New Item
              </CustomButton>
            </div>

            <ItemsList
              items={itemsWithReports}
              onCreateClick={handleCreate}
              onItemDetails={handleItemDetails}
              onReportsList={handleReportsList}
            />
          </>
        )}
      </div>
    </MainLayout>
  );
}

export default Dashboard;

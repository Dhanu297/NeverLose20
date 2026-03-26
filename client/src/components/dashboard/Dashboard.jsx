import React, { useContext, useEffect } from "react";
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
    items,
    loading: itemsLoading,

    // Paging
    page,
    totalPages,
    setPage,

    // Filters
    search,
    setSearch,
    statusFilter,
    setStatusFilter,

    // Sorting
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,

    // Navigation
    handleCreate,
    handleItemDetails,
    handleReportsList,
  } = useDashboard();

  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect to login once auth is done and user is missing
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  // While auth is initializing
  if (authLoading) {
    return <div className="text-white text-center">Checking session...</div>;
  }

  // If user is not logged in, let redirect happen
  if (!user) return null;

  return (
    <MainLayout username={user?.displayName || "User"}>
      <div className="px-0">

        {itemsLoading ? (
          <LoadingSpinner />

        ) : !items || items.length === 0 ? (
          <WelcomeState onCreateClick={handleCreate} />

        ) : (
          <>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4 px-2">
              <h2 className="text-white fw-bold mb-0">My Secure Tags</h2>

              <CustomButton
                onClick={handleCreate}
                className="btn-red btn-sm px-4"
              >
                Add New Item
              </CustomButton>
            </div>

            {/* Items List */}
            <ItemsList
              items={items}

              // Paging
              page={page}
              totalPages={totalPages}
              setPage={setPage}

              // Filters
              search={search}
              setSearch={setSearch}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}

              // Sorting
              sortField={sortField}
              setSortField={setSortField}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}

              // Navigation
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
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ItemList from "../itemsList/ItemsList";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import CustomButton from "../CustomButton/CustomButton";
import itemApi from "../../api/itemApi";
import { useDashboard } from "../../hooks/useDashboard";
import { Row, Col, Container } from "react-bootstrap";

function Dashboard() {
  
 const { items, loading, handleCreate, handleDetail } = useDashboard();
  /*useEffect(() => {
  const fetchItems = async () => {
    try {
      const res = await itemApi.list();
      setItems(res);
    } catch (err) {
      console.error("Failed to load items:", err);
    }
  };

  fetchItems();
}, []);*/


  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

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
    <Container fluid className="px-0">
      {/* header pn dashboard */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-0">Your Items</h2>
          <p className="text-white-50 small">
            Manage and protect your valuables
          </p>
        </div>

        <CustomButton
          onClick={() => navigate("/create-item")}
          variant="primary"
          className="btn-red"
        >
          + Create New Item
        </CustomButton>
      </div>

      {/* Grid de Items */}
      {!items || items.length === 0 ? (
        <div className="text-center py-5 bg-white bg-opacity-10 rounded-4 border border-white border-opacity-25">
          <p className="mb-0 text-white">You haven't created any items yet.</p>
          <small className="text-white-50">
            Click the button above to start protecting your things.
          </small>
        </div>
      ) : (
        <MainLayout username="Sarah">
      {loading ? (
        <div className="text-white text-center">Loading...</div>
      ) : (
        <ItemList
          items={items}
          onCreateClick={handleCreate}
          onDetailClick={handleDetail}
        />)}
        </MainLayout>
      )}
    </Container>
  );
}

export default Dashboard;

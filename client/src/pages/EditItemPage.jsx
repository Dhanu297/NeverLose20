import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useItemDetails } from "../hooks/useItemDetails";
import { AuthContext } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout/MainLayout";
import EditItemComponent from "../components/EditItemComponent/EditItemComponent";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
const EditItemPage = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);   
  const navigate = useNavigate();
  const { user, loading: authLoading } = useContext(AuthContext);
  
  const { item, loading, error } = useItemDetails(id);

  useEffect(() => {
  if (item) setItemData(item);
}, [item]);

  if (authLoading || loading) return <LoadingSpinner message="Loading..." />; 

  if (!itemData) return <div>Loading...</div>;

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <EditItemComponent item={itemData} />
      </div>
    </MainLayout>
  );
};

export default EditItemPage;
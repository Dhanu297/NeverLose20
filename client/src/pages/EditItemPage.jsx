import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import EditItemComponent from "../components/EditItemComponent/EditItemComponent";

const EditItemPage = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    const mockItem = {
      _id: id,
      nickname: "Grey Adventure Backpack",
      description: "North Face bag...",
      securityQuestion: "What color is inside?",
      status: "Lost",
      photo: "https://via.placeholder.com/200"
    };

    setItemData(mockItem);
  }, [id]);

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
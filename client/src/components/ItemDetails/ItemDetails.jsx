import React from "react";
import ItemCard from "../itemCard/ItemCard";
import LabelScreen from "../LabelScreen/LabelScreen";
import EditDeleteComponent from "../EditDeleteComponent/EditDeleteComponent";
import { useNavigate } from "react-router-dom";

function ItemDetails({ item, onDelete, loadingDel }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-4 shadow p-4">
      <ItemCard
        data={item}
        onEdit={() => navigate(`/edit-item/${item.id}`)}
        onDelete={onDelete}
        showActions={true}
      />
      <div className="mt-4">
        <LabelScreen item={item} embedded />
      </div>
    </div>
  );
}

export default ItemDetails;

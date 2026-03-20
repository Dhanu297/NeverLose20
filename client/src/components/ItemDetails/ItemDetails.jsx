import React from "react";
import ItemCard from "../itemCard/ItemCard";
import LabelScreen from "../LabelScreen/LabelScreen";
import EditDeleteComponent from "../EditDeleteComponent/EditDeleteComponent";
import { useNavigate } from "react-router-dom";

function ItemDetails({ item, onDelete, loadingDel }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-4 shadow p-4">
    
        <EditDeleteComponent 
          onEdit={() => navigate(`/items/edit/${item.id}`)} 
          onDelete={onDelete} 
          isDeleting={loadingDel}
        />
      
          <ItemCard data={item} />
      
          <button 
            className="btn btn-primary rounded-pill px-4"
            onClick={() => navigate(`/label/${item.id}`, { state: item })}
          >
            View & Download Labels
          </button>
       
    </div>
  );
}

export default ItemDetails;
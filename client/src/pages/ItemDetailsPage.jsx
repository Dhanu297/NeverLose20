import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useItemDetails } from "../hooks/useItemDetails";
import { useDeleteItem } from "../hooks/useDeleteItem";
import { useConfirmDialog } from "../hooks/useConfirmDialog";

import MainLayout from "../layouts/MainLayout/MainLayout";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import ConfirmDialog from "../components/confirmDialog/ConfirmDialog";
import ItemDetails from "../components/ItemDetails/ItemDetails";

export default function ItemDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useContext(AuthContext);

  const { item, loading, error } = useItemDetails(id);
  const { deleteItem, loadingDel } = useDeleteItem();
  const confirm = useConfirmDialog();

  const handleDelete = () => {
    confirm.ask(
      "This will permanently delete the item and all associated reports.",
      async () => {
        const result = await deleteItem(id);
        if (result.ok) navigate("/dashboard");
        confirm.close();
      }
    );
  };

  if (authLoading || loading) return <LoadingSpinner message="Loading..." />;

  return (
    <MainLayout username={user?.displayName || "User"}>
      <div className="container mt-4">
        <button
          className="btn btn-link text-white text-decoration-none p-0"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-chevron-left me-1"></i>
           Back
        </button>

        <div className="px-4 pt-4 pb-3">
          <h3 className="text-white fw-bold mb-1">Item Details</h3>
        </div>
        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <ItemDetails item={item} onDelete={handleDelete} loadingDel={loadingDel} />
        )}
      </div>

      <ConfirmDialog
        open={confirm.open}
        message={confirm.message}
        onConfirm={confirm.onConfirm}
        onCancel={confirm.close}
      />
    </MainLayout>
  );
}
//     <div className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition">
//       <div className="flex justify-between items-start">
//         <h3 className="text-lg font-semibold">{item.nickname}</h3>
//         <button
//         onClick={handleDelete}
//         disabled={loading}
//         className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
//       >
//         {loadingDel ? "Deleting..." : "Delete Item"}
//       </button>

//       {errorDel && <p className="text-red-600 mt-2">{errorDel}</p>}

//       <ConfirmDialog
//         open={confirm.open}
//         message={confirm.message}
//         onConfirm={confirm.onConfirm}
//         onCancel={confirm.close}
//       />

//         <ReviewStep form={item} showButtons={false}/>
//         <span
//           className={`px-2 py-1 text-xs rounded ${
//             item.status === "ACTIVE"
//               ? "bg-green-100 text-green-700"
//               : "bg-gray-200 text-gray-600"
//           }`}
//         >
//           {item.status}
//         </span>
//       </div>

//       {item.description && (
//         <p className="text-gray-600 mt-1">{item.description}</p>
//       )}

//       <div className="mt-3 text-sm">
//         <p>
//           <strong>Last Activity:</strong>{" "}
//           {item.lastActivityAt ? item.lastActivityAt : "No activity yet"}
//         </p>

//         <p className="mt-1">
//           <strong>Scan URL:</strong>{" "}
//           <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
//             {item.publicScanUrl}
//           </code>
//         </p>
//       </div>

//       <div className="mt-4 flex gap-3">
//         <button
//           onClick={() => navigate(`/label/${item.id}`, { state: item })}
//           className="px-3 py-2 bg-blue-600 text-white rounded text-sm"
//         >
//           View Label
//         </button>

//         <button
//           onClick={() => navigate(`/items/${item.id}`)}
//           className="px-3 py-2 bg-gray-200 rounded text-sm"
//         >
//           Details
//         </button>
//       </div>
//     </div>
//   );
// }

import EditDeleteComponent from "../EditDeleteComponent/EditDeleteComponent";
import { useState } from "react";
import ItemLogModal from "../ItemLogModal/ItemLogModal";

const ItemCard = ({ data, onEdit, onDelete, showActions = false }) => {


  const { id, nickname, description, photoUrl, verification } = data;

  // Modal state
  const [showLogModal, setShowLogModal] = useState(false);
    if (!data) return null;

  return (
    <>
      {/* MAIN CARD */}
      <div
        className="container mx-auto bg-white p-4 p-md-4"
        style={{ maxWidth: "850px" }}
      >
        <div className="row align-items-center gx-lg-5">

          {/* LEFT SIDE IMAGE */}
          <div className="col-12 col-md-6 d-flex justify-content-center">
            <div
              className="rounded-4 border overflow-hidden bg-light d-flex align-items-center justify-content-center mx-auto"
              style={{ width: "100%", aspectRatio: "1 / 1" }}
            >
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={nickname}
                  className="w-100 h-100 object-fit-cover"
                />
              ) : (
                <div className="h-100 d-flex align-items-center justify-content-center text-muted">
                  No image uploaded
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE TEXT + ICONS */}
          <div className="col-md-6 d-flex justify-content-between align-items-center">
            <div className="flex-grow-1 mt-3">
              <h2 className="fw-bold mb-2" style={{ color: "var(--nl-deep-blue)" }}>
                {nickname || "Unnamed Item"}
              </h2>

              <p className="text-muted mb-2">
                {description || "No description provided."}
              </p>

              {/* VIEW LOG HISTORY LINK */}
              <button
                className="btn btn-link p-0 mb-3"
                style={{ color: "var(--nl-tech-blue)" }}
                onClick={() => setShowLogModal(true)}
              >
                View Log History
              </button>

              {verification?.question && (
                <div className="p-3 bg-light rounded-3">
                  <label
                    className="d-block fw-bold small text-uppercase mb-1"
                    style={{ color: "var(--nl-tech-blue)", letterSpacing: "1px" }}
                  >
                    Security Question
                  </label>
                  <span>{verification.question}</span>
                </div>
              )}
            </div>

            {/* EDIT / DELETE ICONS */}
            {showActions && (
              <div className="ms-3">
                <EditDeleteComponent onEdit={onEdit} onDelete={onDelete} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* LOG MODAL */}
      {showLogModal && (
        <ItemLogModal
          itemId={id}
          onClose={() => setShowLogModal(false)}
        />
      )}
    </>
  );
};

export default ItemCard;
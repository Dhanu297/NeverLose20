import React from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateItem } from "../../hooks/useUpdateItem";
import { useEditFormData } from "../../hooks/useEditFormData";

const EditItemComponent = ({ item }) => {
  const navigate = useNavigate();
  const { updateItem, loading: saving } = useUpdateItem(item.id);

  // Pass item directly into your hook
  const {
    formData,
    handleChange,
    handlePhotoChange,
  } = useEditFormData(item);

  const handleSubmit = async () => {
    await updateItem({
      nickname: formData.nickname,
      description: formData.description,
      securityQuestion: formData.securityQuestion,
      status: formData.status,
      photoUrl: formData.photoUrl,
    });

    navigate(`/items/${item.id}`);
  };

  return (
    <div className="item-form-content">
      <h3 className="text-white text-center fw-bold mb-4 display-6">
        Edit Your Item
      </h3>

      <div className="bg-white rounded-4 shadow-sm w-100 px-5 py-4">
        <div style={{ maxWidth: "900px" }} className="mx-auto">
          <div className="d-flex gap-4">

            {/* LEFT SIDE */}
            <div style={{ width: "35%" }} className="text-center">
              <p className="fw-semibold mt-2">Upload a Photo:</p>

              <img
                src={formData.photoUrl}
                alt="item"
                className="img-fluid rounded mb-3"
                style={{ height: "150px", objectFit: "cover" }}
              />

              <label className="btn btn-outline-primary w-100 mb-3">
                Change Photo
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </label>

              <select
                className="form-select"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">Item Status</option>
                <option value="SAFE">Safe</option>
                <option value="CLOSED">Closed</option>
                <option value="LOST">Lost</option>
              </select>
            </div>

            {/* RIGHT SIDE */}
            <div style={{ width: "65%" }}>
              <div className="mb-3">
                <label>Item Nickname:</label>
                <input
                  type="text"
                  className="form-control"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>Description:</label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>Security Question</label>
                <input
                  type="text"
                  className="form-control"
                  name="securityQuestion"
                  value={formData.securityQuestion}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex justify-content-between mt-4">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>

                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSubmit}
                >
                  {saving ? "Updating..." : "Update Item"}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItemComponent;
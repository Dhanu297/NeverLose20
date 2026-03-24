import React from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateItem } from "../../hooks/useUpdateItem";
import { useEditFormData } from "../../hooks/useEditFormData";
import CustomButton from "../CustomButton/CustomButton";
import UploadPhoto from "../uploadPhoto/UploadPhoto";

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
    <div className="main-card p-4">
      <h3 className="text-white fw-bold mb-4">
        Edit Your Item
      </h3>

      <div className="bg-white rounded-4 shadow-sm w-100 px-5 py-4">
          <div className="d-flex gap-4">

            {/* LEFT SIDE */}
            <div style={{ width: "35%" }}>
              <p className="fw-semibold mt-2">Upload a Photo:</p>
            <UploadPhoto
            photoUrl={formData.photoUrl}
            onUploaded={(url) =>
            handleChange({
            target: { name: "photoUrl", value: url },
    })
  }
/>
              <div className="mt-3">
  <p className="fw-semibold mb-1">
    Item Status:
  </p>

  <select
    className="form-select form-select-sm"
    name="status"
    value={formData.status}
    onChange={handleChange}
  >
    <option value="">Select Status</option>
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
                <CustomButton
                  variant="outline"
                  
                  onClick={() => navigate(-1)}
                >
                  Back
                </CustomButton>

                <CustomButton
                  
                  variant="primary"
                  disabled={saving}
                  onClick={handleSubmit}
                >
                  {saving ? "Updating..." : "Update Item"}
                </CustomButton>
              </div>
            </div>

          </div>
        </div>
      </div>
  );
};

export default EditItemComponent;
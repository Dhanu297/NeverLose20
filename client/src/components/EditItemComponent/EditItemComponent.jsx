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
  const { formData, handleChange, handlePhotoChange } = useEditFormData(item);
  const [enableVerification, setEnableVerification] = React.useState(false)
  React.useEffect(() => {
  setEnableVerification(formData.enableVarification);
}, [formData.enableVarification]);


  const handleSubmit = async () => {
    try {
     await updateItem({
  nickname: formData.nickname,
  description: formData.description,
  status: formData.status,
  photoUrl: formData.photoUrl,
  verification: {
    enabled: enableVerification,
    question: enableVerification ? formData.securityQuestion : "",
  },
});

      navigate(`/item-details/${item.id}`);
    } catch (error) {
      console.log("Error in update");
    }
  };

  const isFormInvalid =
    !formData.nickname?.trim() ||
    (enableVerification && !formData.securityQuestion?.trim());

  return (
    <div className="item-form-content">
      <div className="d-flex flex-column align-items-start mb-3">
        <h3 className="text-white fw-bold mb-2">Edit Your Item</h3>

        <button
          className="btn btn-link text-white text-decoration-none p-0 opacity-hover"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-chevron-left"></i>
          <span className="ms-1">Back</span>
        </button>
      </div>

      {/* WHITE CARD */}
      <div className="bg-white rounded-4 shadow-sm w-100 px-5 py-4">
        <div style={{ maxWidth: "900px" }} className="mx-auto">
          <div className="py-4">
            <div className="row align-items-center gx-lg-5">
              {/* LEFT SIDE */}
              <div className="col-12 col-md-6 mb-4 mb-md-0 d-flex flex-column">
                <label className="form-label fw-semibold mb-1">
                  Upload Photo:
                </label>
                <div
                  className="flex-grow-1 p-1"
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    aspectRatio: "1 / 1",
                    margin: "0 auto",
                  }}
                >
                  <UploadPhoto
                    photoUrl={formData.photoUrl}
                    onUploaded={(url) =>
                      handleChange({
                        target: { name: "photoUrl", value: url },
                      })
                    }
                    style={{ minHeight: "230px" }}
                  />
                </div>

                {/* Item Status */}
                <div className="my-4">
                  <label className="form-label fw-semibold small mb-2 d-flex align-items-center">
                    Item Status:
                    <span
                      className={`status-dot ms-2 ${formData.status?.toLowerCase()}`}
                    ></span>
                  </label>

                  <select
                    className="form-select border-1"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    style={{ backgroundColor: "var(--nl-light-bg)" }}
                  >
                    <option value="SAFE">Safe</option>
                    <option value="LOST">Lost</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                  <div
                    className="p-3 rounded-3 mt-2"
                    style={{
                      backgroundColor: "var(--nl-light-bg)",
                      borderLeft: `4px solid var(--nl-${formData.status === "LOST" ? "danger" : formData.status === "SAFE" ? "success" : "warning"})`,
                    }}
                  >
                    <p
                      className="small mb-0 "
                      style={{ color: "var(--nl-dark-navy)" }}
                    >
                      {formData.status === "SAFE" &&
                        "Private & Secure. Your item is protected and its recovery page is hidden from the public."}
                      {formData.status === "LOST" &&
                        "Active Search. The recovery page is now public. Anyone who scans your QR code can contact you."}
                      {formData.status === "CLOSED" &&
                        "Case Resolved. This item is archived. The QR code is deactivated and will no longer show info."}
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="col-12 col-md-6">
                <div className="mb-4">
                  <label className="form-label fw-semibold mb-2">
                    <span className="text-danger me-1">*</span>
                    Item Nickname :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="nickname"
                    maxLength={50}
                    required
                    value={formData.nickname}
                    onChange={handleChange}
                    placeholder="e.g., Grey Adventure Backpack"
                  />
                  {!formData.nickname && (
                    <div className="nl-animated-fade-in">
                      <small className="text-danger small px-1">
                        <i className="bi bi-exclamation-circle me-1"></i>
                        Item Nickname is required
                      </small>
                    </div>
                  )}
                </div>
                <div>
                  <label className="form-label fw-semibold">Description:</label>
                  <textarea
                    className="form-control"
                    maxLength={200}
                    rows="4"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Mention unique details like marks or tags"
                  />
                  <p className="text-end small mt-1 me-2">
                    {formData.description?.length || 0}/200
                  </p>
                </div>

                {/* security question */}
                <div className="mb-3">
                  <div className="d-flex mb-1">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={enableVerification}
                        onChange={(e) =>
                          setEnableVerification(e.target.checked)
                        }
                      />
                    </div>
                    <label className="fw-semibold mb-0">
                      Enable Verification Question
                    </label>
                  </div>

                  {enableVerification && (
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        <span className="text-danger me-1">*</span>Your Security
                        Question:
                      </label>

                      <textarea
                        style={{
                          zIndex: 2,
                          position: "relative",
                          backgroundColor: "var(--nl-light-bg)",
                        }}
                        className="form-control"
                        maxLength={200}
                        rows="4"
                        name="securityQuestion"
                        value={formData.securityQuestion}
                        onChange={handleChange}
                        placeholder="e.g., What color is the inside pocket or is there any specific brand on the zipper?"
                      />
                      <div
                        className="nl-animated-fade position-relative mt-1 pt-1 d-flex justify-content-between px-2"
                        style={{
                          zIndex: 1,
                        }}
                      >
                        <small
                          className="small text-muted px-1"
                          style={{ maxWidth: "75%" }}
                        >
                          <i className="bi bi-exclamation-circle me-1"></i>The
                          finder will see this question to prove they have the
                          item.
                        </small>
                        <p className="text-end small me-2">
                         {formData.securityQuestion?.length || 0}/200
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Buttons Bar */}
              <div className="d-flex justify-content-end mt-4">
                <CustomButton
                  variant="primary"
                  disabled={saving || isFormInvalid}
                  onClick={handleSubmit}
                >
                  {saving ? "Updating..." : "Update Item"}
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditItemComponent;

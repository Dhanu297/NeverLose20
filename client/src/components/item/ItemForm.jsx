import React, { useState } from "react"; //Importing react and usestate hook from
import "./ItemForm.css";
import CustomButton from "../CustomButton/CustomButton";
import UploadPhoto from "../uploadPhoto/UploadPhoto";
import { useNavigate } from "react-router-dom";

function ItemForm({ form, setForm, next }) {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (!form.nickname.trim()) {
      setError("Item Nickname is required");
      return;
    }
    setError("");
    next();
  };
  const totalSteps = 3;
  const currentStep = 1;

  return (
    <div className="item-form-content">
      <div className="d-flex flex-column align-items-start mb-">
        <h3 className="text-white fw-bold mb-2">Create Your Item</h3>

        <button
          className="btn btn-link text-white text-decoration-none p-0"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-chevron-left"></i>
          <span className="ms-1">Back</span>
        </button>
      </div>

      <div className="d-flex align-items-center justify-content-center px-5 bg-white rounded-4 shadow-sm w-100">
        <div style={{ maxWidth: "900px" }} className="w-100">
          <p
            className="text-center text-muted m-5 mx-auto"
            style={{ maxWidth: "600px" }}
          >
            This info helps organize your inventory and helps the finder
            identify your item.
          </p>

          <div className="pb-5">
            <div className="row g-5 g-lg-5 justify-content-center align-items-center">
              {/* left side */}
              <div className="col-md-6 order-1 order-md-1 d-flex flex-column align-items-center">
                <div className="col-md-6 order-2 order-md-1">
                  <label className="form-label fw-semibold mb-1">
                    Upload Photo:
                  </label>

                  <UploadPhoto
                    photoUrl={form.photoUrl}
                    onUploaded={(url) => setForm({ ...form, photoUrl: url })}
                    style={{ minHeight: "230px", maxHeight: "400px" }}
                  />
                </div>
              </div>

              {/* right side */}
              <div className="col-md-6 order-1 order-md-2">
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    <span className="text-danger me-1">*</span>
                    Item Nickname :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.nickname}
                    maxLength={50}
                    required
                    onChange={(e) =>
                      setForm({ ...form, nickname: e.target.value })
                    }
                    placeholder="e.g., Grey Adventure Backpack"
                  />
                  {error && (
                    <p className="text-danger text-center mt-2 small">
                      {error}
                    </p>
                  )}
                </div>
                <div>
                  <label className="form-label fw-semibold">Description:</label>
                  <textarea
                    className="form-control"
                    maxLength={200}
                    rows="5"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="Mention unique details like marks or tags"
                  />
                  <p className="text-end small mt-1 me-2">
                    {form.description?.length || 0}/200
                  </p>
                </div>
              </div>

              {/* Buttons Bar */}
              <div className="order-3 text-end pb-2">
                <CustomButton variant="primary" onClick={handleNext}>
                  Next
                </CustomButton>
              </div>
            </div>
          </div>
          {/* Progress Bar */}
          <div className=" p-2 mt-3 mx-auto" style={{ maxWidth: "450px" }}>
            <div className="progress rounded-pill" style={{ height: "10px" }}>
              <div
                className="progress-bar bg-primary"
                role="progressbar"
                style={{ width: "33%", padding: "20px" }}
              ></div>
            </div>
            <p className="mt-1 text-center small text-muted fw-medium">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemForm;

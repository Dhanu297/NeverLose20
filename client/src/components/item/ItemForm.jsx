import React, { useState } from "react";
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
      <div className="d-flex flex-column align-items-start mb-3">
        <h3 className="text-white fw-bold mb-2">Create Your Item</h3>

        <button
          className="btn btn-link text-white text-decoration-none p-0 opacity-hover"
          onClick={() => navigate("/")}
        >
          <i className="bi bi-chevron-left"></i>
          <span className="ms-1">Back</span>
        </button>
      </div>

      <div className="bg-white rounded-4 shadow-sm w-100 px-5 py-4">
        <div style={{ maxWidth: "900px" }} className="mx-auto">
          <p
            className="text-center text-muted mt-4 mb-5 mx-auto"
            style={{ maxWidth: "600px" }}
          >
            This info helps organize your inventory and helps the finder
            identify your item.
          </p>

          <div className="pb-4">
            <div className="row align-items-center gx-lg-5">
              {/* left side */}
              <div className="col-12 col-md-6 mb-4 mb-md-0 d-flex flex-column">
                <label className="form-label fw-semibold mb-1">
                  Upload Photo:
                </label>
                <div
                  className="flex-grow-1 p-1"
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    aspectRatio: "1 / 1",
                    margin: "0 auto",
                  }}
                >
                  <UploadPhoto
                    photoUrl={form.photoUrl}
                    onUploaded={(url) => setForm({ ...form, photoUrl: url })}
                  />
                </div>
              </div>

              {/* right side */}
              <div className="col-12 col-md-6">
                <div className="mb-4">
                  <label className="form-label fw-semibold mb-2">
                    <span className="text-danger me-1">*</span>
                    Item Nickname :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.nickname}
                    maxLength={50}
                    required
                    onChange={(e) => {
                      setForm({ ...form, nickname: e.target.value });
                      if (e.target.value.trim().length > 0 && error) {
                        setError(null);
                      }
                    }}
                    placeholder="e.g., Grey Adventure Backpack"
                  />

                  {error && !form.nickname && (
                    <div className="nl-animated-fade-in">
                      <small className="text-danger mt-2 d-block ms-2 fw-medium">
                        <i className="bi bi-exclamation-circle me-1"></i>
                        {error}
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
            </div>

            {/* Buttons Bar */}
            <div className="order-3 text-end pb-2">
              <CustomButton variant="primary" onClick={handleNext}>
                Next
              </CustomButton>
            </div>
          </div>
          {/* Progress Bar */}
          <div className=" p-2 mt-3 mx-auto" style={{ maxWidth: "450px" }}>
            <div className="progress rounded-pill" style={{ height: "10px" }}>
              <div
                className="progress-bar bg-primary"
                role="progressbar"
                style={{ width: "33%", transition: "width 0.4s ease" }}
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

import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import "./ItemForm.css";
import ItemCard from "../itemCard/ItemCard";
import { useNavigate } from "react-router-dom";

function ReviewStep({ form, back, create, showButtons = true }) {
  const navigate = useNavigate();
  const totalSteps = 3;
  const currentStep = 3;

  return (
    <div className="item-form-content">
      <div className="d-flex flex-column align-items-start mb-3">
        <h3 className="text-white fw-bold mb-2">Review Your Item</h3>

        <button
          className="btn btn-link text-white text-decoration-none p-0 opacity-hover"
          onClick={currentStep === 2 ? () => navigate(-1) : back}
          style={{ transition: "opacity 0.2s" }}
        >
          <i className="bi bi-chevron-left"></i>
          <span className="ms-1">Back</span>
        </button>
      </div>

      <div className="bg-white rounded-4 shadow-sm w-100 px-5 py-4 ">
        <div style={{ maxWidth: "900px" }} className="mx-auto">
          <p
            className="text-center text-muted mt-4 mb-5 mx-auto"
            style={{ maxWidth: "600px" }}
          >
            Check if everything looks correct before securing your item.
          </p>

          <div className="pb-1">
            <ItemCard data={form} />

            {/* Buttons Bar */}
            {showButtons && (
              <div className="order-3 text-end pb-2">
                {/* <CustomButton variant="outline" onClick={back}>
                  Back
                </CustomButton> */}
                <CustomButton variant="primary" onClick={create}>
                  Create Item
                </CustomButton>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="pb- my-4 mx-auto" style={{ maxWidth: "450px" }}>
            <div className="progress rounded-pill" style={{ height: "10px" }}>
              <div
                className="progress-bar bg-primary"
                role="progressbar"
                style={{ width: "100%", transition: "width 0.4s ease" }}
              ></div>
            </div>
            <p className="mt-2 text-center small text-muted fw-medium">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewStep;

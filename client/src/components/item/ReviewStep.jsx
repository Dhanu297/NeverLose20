import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import "./ItemForm.css";

function ReviewStep({ form, back, create, showButtons = true }) {
  const totalSteps = 3;
  const currentStep = 3;
  return (
    <div className="item-form-content">
      <h3 className="text-white text-center fw-bold mb-4 display-6">
        Review Your Item
      </h3>

      <div className="d-flex align-items-center justify-content-center px-5 bg-white rounded-4 shadow-sm w-100">
        <div style={{ maxWidth: "900px" }} className="w-100">
          <p className="text-center text-muted m-5 mx-auto">
            Check if everything looks correct before securing your item.
          </p>

          <div className="pb-5">
            <div className="row g-4 g-lg-5 justify-content-center align-items-center">
              {/* left side */}
              <div className="col-md-6 order-1 order-md-1 d-flex flex-column align-items-center">
                <div className="review-image-wrapper mx-auto mx-md-0">
                  <div className="wizard-image-box rounded-4 border overflow-hidden shadow-sm">
                    {form.photoUrl ? (
                      <img
                        src={form.photoUrl}
                        alt="Item"
                        className="img-fluid w-100"
                      />
                    ) : (
                      <div
                        className="d-flex align-items-center justify-content-center bg-light"
                        style={{ minHeight: "150px" }}
                      >
                        <span className="text-muted small italic">
                          No image available
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* right side */}
              <div className="col-md-6 order-2 order-md-2 mb-3">
                <h2
                  className="fw-bold mb-3 text-dark"
                  style={{ fontSize: "1.8rem" }}
                >
                  {form.nickname || "Unnamed Item"}
                </h2>
                <p
                  className="text-muted mb-4"
                  style={{ lineHeight: "1.6", fontSize: "1.05rem" }}
                >
                  {form.description || "No description provided."}
                </p>

                {form.verification?.enabled && (
                  <div className="security-review-box pt-2 border-top">
                    <label className="small text-muted my-1">
                      Security Question:
                    </label>
                    <p className="fw-bold mb-1 text-dark">
                      {form.verification.question}
                    </p>
                  </div>
                )}
              </div>

              {/* Buttons Bar */}
              {showButtons && (
                <div className="col-12 d-flex justify-content-between mt-4 order-3">
                  <CustomButton variant="outline" onClick={back}>
                    Back
                  </CustomButton>
                  <CustomButton variant="primary" onClick={create}>
                    Create Item
                  </CustomButton>
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="pb-2 my-3 mx-auto" style={{ maxWidth: "450px" }}>
            <div className="progress rounded-pill" style={{ height: "10px" }}>
              <div
                className="progress-bar bg-primary"
                role="progressbar"
                style={{ width: "100%" }}
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

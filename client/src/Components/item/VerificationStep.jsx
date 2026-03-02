import React from "react";
import VerificationImage from "../../assets/VerificationImage.svg";
import CustomButton from "../CustomButton/CustomButton";
import "./ItemForm.css"

function VerificationStep({ form, setForm, next, back }) {
  const toggle = () =>
    setForm({
      ...form,
      verification: {
        ...form.verification,
        enabled: !form.verification.enabled
      }
    });
  const totalSteps=3;
  const currentStep=2;
    return (
  <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">
    <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: "900px", width: "100%" }}>
      <h3 className="text-center fw-bold mb-3">Set a Security Layer</h3>
      <p className="text-center text-muted mb-4">Ask a question that only someone holding the item can answer.</p>
      <div className="row g-4 align-items-start">
        <div className="col-md-6">
          <div className="wizard-image-box">
            {form.photoUrl?(
              <img src={form.photoUrl} alt="uploaded"/>
            ):(
              <span className="text-muted">No image Uploaded</span>
            )
          }
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input"
              checked={form.verification.enabled}
              onChange={toggle}
              id="enableVerification"
            />
            <label className="form-check-label" htmlFor="enableVerification">
              Enable Verification Question
            </label>
          </div>
          {form.verification.enabled && (
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Your Security Question
              </label>
              <input type="text" className="form-control"
                value={form.verification.question}
                onChange={(e) =>
                  setForm({
                    ...form,
                    verification: {
                      ...form.verification,
                      question: e.target.value
                    }
                  })
                }
                placeholder="e.g., What color is the inside pocket?"
              />
            </div>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-between mt-4">
        <CustomButton variant="outline-secondary" onClick={back}>
          Back
        </CustomButton>
        <CustomButton variant="primary" onClick={next}>
         Review & Create
        </CustomButton>
      </div>
  <div className="mb-3 mt-4">
  <div className="progress rounded-pill" style={{ height: "10px" }}>
    <div
      className="progress-bar bg-primary"
      role="progressbar"
      style={{ width: "66%" }}
    ></div>
  </div>
</div>
<p className="mt-2 text-center fw-semibold"
 style={{fontSize:"13px",color:"#6c757d"}}>
  Step {currentStep} of {totalSteps}
 </p>

    </div>
  </div>
);
}
export default VerificationStep;
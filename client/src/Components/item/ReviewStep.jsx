import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import "./ItemForm.css"

function ReviewStep({form,back,create }) {
  const totalSteps=3;
  const currentStep=3;
  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: "900px", width: "100%" }}>
        <h3 className="text-center fw-bold mb-4">Review Your Item</h3>
        <div className="mb-4">
          <div className="row align-items-center">
  <div className="col-md-6 text-center mb-4 mb-md-0">
    <div className="wizard-image-box">
      {form.photoUrl?(
        <img src={form.photoUrl} alt="Item"/>
      ):(
        <span className="text-muted">No image available</span>
      )}
    </div>
  </div>
  <div className="col-md-6">

    <div className="mb-3">
      <strong>Nickname:</strong>
      <div className="text-muted">{form.nickname || "-"}</div>
    </div>
    <div className="mb-3">
      <strong>Description:</strong>
      <div className="text-muted">{form.description || "-"}</div>
    </div>
    <div className="mb-3">
      <strong>Photo URL:</strong>
      <div className="text-muted">{form.photoUrl || "-"}</div>
    </div>
    <div className="mb-3">
      <strong>Verification Enabled:</strong>
      <div className="text-muted">
        {form.verification.enabled ? "Yes" : "No"}
      </div>
    </div>
    {form.verification.enabled && (
      <div className="mb-3">
        <strong>Security Question:</strong>
        <div className="text-muted">
          {form.verification.question}
        </div>
      </div>
    )}

  </div>

</div>              
    <div className="d-flex justify-content-between mt-4">
          <CustomButton variant="outline-secondary" onClick={back}>
            Back
          </CustomButton>
          <CustomButton variant="success" onClick={create}>
          Create Item
          </CustomButton>
          </div>
  <div className="mb-3 mt-4">
  <div className="progress rounded-pill" style={{ height: "10px" }}>
    <div
      className="progress-bar bg-primary"
      role="progressbar"
      style={{ width: "100%" }}
    ></div>
  </div>
</div>
<p className="mt-2 text-center fw-semibold"
 style={{fontSize:"13px",color:"#6c757d"}}>
  Step {currentStep} of {totalSteps}
 </p>
      </div>
    </div>
    </div>
  );
}

export default ReviewStep;

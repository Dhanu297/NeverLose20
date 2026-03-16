import { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";

function Step2Verification({
  reportData,
  setReportData,
  onSubmit, onBack
}) {
  const [errors, setErrors] = useState({});
  const update = (field, value) =>
    setReportData((prev) => ({ ...prev, [field]: value }));

  const updateFinder = (field, value) =>
    setReportData((prev) => ({
      ...prev,
      finder: { ...prev.finder, [field]: value },
    }));
  const validate=()=>{
    let newErrors={};
      if(!reportData.finder.email){
        newErrors.email="Email is required"
      }
      if(!reportData.message){
        newErrors.message="Message is required"
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length===0;
    };
  const handleSubmit=()=>{
    if(!validate())return;
    onSubmit();
  }

  return (
  <div className="container p-4 px-4 bg-white shadow rounded-lg">

  <h4 className="mb-4 fw-bold">Submit Found Report</h4>
  <div className="row mb-3 align-items-center">
    <div className="col-3">
      <label className="fw-semibold">Your Email <span style={{color:"red"}}>*</span></label>
    </div>

    <div className="col-1" style={{ width: "100px" }}></div>

    <div className="col">
      <input
        type="email"
        className="form-control"
        placeholder="Enter your email"
        value={reportData.finder.email}
        onChange={(e) => updateFinder("email", e.target.value)}
        required
      />
      {errors.email&&(
        <div className="text-danger">
          {errors.email}
          </div>
      )}
    </div>
  </div>
  <div className="row mb-3">
    <div className="col-3">
      <label className="fw-semibold">Message <span style={{color:"red"}}>*</span></label>
    </div>

    <div className="col-1" style={{ width: "100px" }}></div>

    <div className="col">
      <textarea
        className="form-control"
        placeholder="Describe the found item"
        rows={3}
        value={reportData.message}
        onChange={(e) => update("message", e.target.value)}
        required minLength={10}
      ></textarea>
      {errors.message&& (
        <div className="text-danger">
          {errors.message}
          </div>
      )}
    </div>
  </div>


  {/* Row 1 */}
  <div className="row mb-3 align-items-center">
    <div className="col-3">
      <label className="fw-semibold">Your Name (optional)</label>
    </div>

    <div className="col-1" style={{ width: "100px" }}></div>

    <div className="col">
      <input
        type="text"
        className="form-control"
        placeholder="Enter your name"
        value={reportData.finder.name || ""}
        onChange={(e) => updateFinder("name", e.target.value)}
      />
    </div>
  </div>

  {/* Row 2 */}
  <div className="row mb-3 align-items-center">
    <div className="col-3">
      <label className="fw-semibold">Phone Number (optional)</label>
    </div>

    <div className="col-1" style={{ width: "100px" }}></div>

    <div className="col">
      <input
        type="text"
        className="form-control"
        placeholder="Enter phone number"
        value={reportData.finder.phone || ""}
        onChange={(e) => updateFinder("phone", e.target.value)}
      />
    </div>
  </div>

  {/* Row 5 */}
  <div className="row mb-3 align-items-center">
    <div className="col-3">
      <label className="fw-semibold">Location (optional)</label>
    </div>

    <div className="col-1" style={{ width: "100px" }}></div>

    <div className="col">
      <input
        type="text"
        className="form-control"
        placeholder="Where did you find it?"
        value={reportData.foundLocationText}
        onChange={(e) => update("foundLocationText", e.target.value)}
      />
    </div>
  </div>

  <div className="row mt-4 align-items-center">
    <div className="col-3"></div>
    <div className="col-1" style={{ width: "100px" }}></div>
    <div className="col d-flex justify-content-between">
       <CustomButton
      className="btn btn-outline-secondary w-40"
      onClick={onBack}
    >
      Back
    </CustomButton>
    <CustomButton
        onClick={handleSubmit}
        className="btn btn-primary w-55">
        Submit Report
    </CustomButton>
    </div>
  </div>

</div>
  );
}
export default Step2Verification;
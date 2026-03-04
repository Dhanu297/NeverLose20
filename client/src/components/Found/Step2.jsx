import CustomButton from "../CustomButton/CustomButton";

export default function Step2Verification({
  reportData,
  setReportData,
  onSubmit, onBack
}) {
  const update = (field, value) =>
    setReportData((prev) => ({ ...prev, [field]: value }));

  const updateFinder = (field, value) =>
    setReportData((prev) => ({
      ...prev,
      finder: { ...prev.finder, [field]: value },
    }));

  return (
  <div className="container p-4 px-4 bg-white shadow rounded">

  <h4 className="mb-4 fw-bold">Submit Found Report</h4>

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

  {/* Row 3 */}
  <div className="row mb-3 align-items-center">
    <div className="col-3">
      <label className="fw-semibold">Your Email *</label>
    </div>

    <div className="col-1" style={{ width: "100px" }}></div>

    <div className="col">
      <input
        type="email"
        className="form-control"
        placeholder="Enter your email"
        value={reportData.finder.email}
        onChange={(e) => updateFinder("email", e.target.value)}
      />
    </div>
  </div>

  {/* Row 4 */}
  <div className="row mb-3">
    <div className="col-3">
      <label className="fw-semibold">Message *</label>
    </div>

    <div className="col-1" style={{ width: "100px" }}></div>

    <div className="col">
      <textarea
        className="form-control"
        placeholder="Describe the found item"
        rows={4}
        value={reportData.message}
        onChange={(e) => update("message", e.target.value)}
      ></textarea>
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

  {/* Row 6 */}
  <div className="row mt-4">
    <div className="col-3"></div>
    <div className="col-1" style={{ width: "100px" }}></div>
    <div className="col">
       <CustomButton
      className="btn btn-outline-secondary w-40"
      onClick={onBack}
    >
      Back
    </CustomButton>
&nbsp;
      <CustomButton
        onClick={onSubmit}
        disabled={!reportData.finder.email || !reportData.message}
        className="btn btn-primary w-50"
      >
        Submit Report
      </CustomButton>
    </div>
  </div>

</div>
  );
}
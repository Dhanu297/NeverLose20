import CustomButton from "../CustomButton/CustomButton";

export default function Step3FoundForm({
  reportData,
  setReportData,
  onSubmit,
}) {
  const update = (field, value) =>
    setReportData((prev) => ({ ...prev, [field]: value }));

  const updateFinder = (field, value) =>
    setReportData((prev) => ({
      ...prev,
      finder: { ...prev.finder, [field]: value },
    }));

  return (
    <div className="max-w-md mx-auto space-y-5">
      <h3 className="fw-bold display-4 mb-2 text-dark">Thank You!!</h3>

      {/* Name (optional) */}
      <div className="space-y-1">
        <label className="font-medium">Thank you for submitting the report. Owner will contact soon.</label>
        
    </div>
    </div>
  );
}
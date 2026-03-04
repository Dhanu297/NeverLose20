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
      <h4 className="text-xl font-semibold">Submit Found Report</h4>

      {/* Name (optional) */}
      <div className="space-y-1">
        <label className="font-medium">Your Name (optional)</label>
        <input
          className="w-full border p-3 rounded"
          placeholder="Enter your name"
          value={reportData.finder.name || ""}
          onChange={(e) => updateFinder("name", e.target.value)}
        />
      </div>

      {/* Phone Number (optional) */}
      <div className="space-y-1">
        <label className="font-medium">Phone Number (optional)</label>
        <input
          className="w-full border p-3 rounded"
          placeholder="Enter phone number"
          value={reportData.finder.phone || ""}
          onChange={(e) => updateFinder("phone", e.target.value)}
        />
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label className="font-medium">Your Email *</label>
        <input
          className="w-full border p-3 rounded"
          placeholder="Enter your email"
          value={reportData.finder.email}
          onChange={(e) => updateFinder("email", e.target.value)}
        />
      </div>

      {/* Message */}
      <div className="space-y-1">
        <label className="font-medium">Message *</label>
        <textarea
          className="w-full border p-3 rounded"
          placeholder="Describe the found item"
          value={reportData.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </div>

      {/* Location */}
      <div className="space-y-1">
        <label className="font-medium">Location (optional)</label>
        <input
          className="w-full border p-3 rounded"
          placeholder="Where did you find it?"
          value={reportData.foundLocationText}
          onChange={(e) => update("foundLocationText", e.target.value)}
        />
      </div>

      {/* Submit */}
      <CustomButton
        onClick={onSubmit}
        disabled={!reportData.finder.email || !reportData.message}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full disabled:bg-gray-400"
      >
        Submit Report
      </CustomButton>
    </div>
  );
}
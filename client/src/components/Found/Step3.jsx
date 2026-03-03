export default function Step3FoundForm({
  reportData,
  setReportData,
  onSubmit,
}) {
  const update = (field, value) =>
    setReportData((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Submit Found Report</h2>

      <input
        className="w-full border p-3 rounded"
        placeholder="Your email *"
        value={reportData.finder.email}
        onChange={(e) =>
          setReportData({
            ...reportData,
            finder: { ...reportData.finder, email: e.target.value },
          })
        }
      />

      <textarea
        className="w-full border p-3 rounded"
        placeholder="Message *"
        value={reportData.message}
        onChange={(e) => update("message", e.target.value)}
      />

      <input
        className="w-full border p-3 rounded"
        placeholder="Location (optional)"
        value={reportData.foundLocationText}
        onChange={(e) => update("foundLocationText", e.target.value)}
      />

      <button
        onClick={onSubmit}
        disabled={!reportData.finder.email || !reportData.message}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full disabled:bg-gray-400"
      >
        Submit Report
      </button>
    </div>
  );
}
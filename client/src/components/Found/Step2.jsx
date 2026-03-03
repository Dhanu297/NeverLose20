export default function Step2Verification({
  item,
  answer,
  setAnswer,
  onNext,
}) {
  return (
    <div className="max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold">The Security Question</h2>

      <p className="text-gray-700">{item.verificationQuestion}</p>

      <input
        className="w-full border p-3 rounded"
        placeholder="Your answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <button
        onClick={onNext}
        disabled={!answer.trim()}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full disabled:bg-gray-400"
      >
        Save & Continue
      </button>
    </div>
  );
}
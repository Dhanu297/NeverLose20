export default function Step1ItemPreview({ item, onNext }) {
  return (
    <div className="max-w-md mx-auto text-center space-y-4">
      <h1 className="text-2xl font-bold">You're someone's hero today!</h1>
      <p className="text-gray-600">
        You found <strong>{item.nickname}</strong>. Let's help return it safely.
      </p>

      {item.status === "CLOSED" ? (
        <p className="text-red-600 font-semibold">
          This tag is inactive.
        </p>
      ) : (
        <button
          onClick={onNext}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Continue
        </button>
      )}
    </div>
  );
}
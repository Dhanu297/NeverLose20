import CustomButton from "../CustomButton/CustomButton";
import UploadPhoto from "../uploadPhoto/UploadPhoto";

export default function Step1ItemPreview({
  item,
  onNext,
  answer,
  photoUrl,
  seturl,
  setAnswer
}) {
  return (
    <div className="container p-4  px-4 bg-white shadow rounded">

      <h4 className="mb-4 fw-bold text-center">The Security Question</h4>

      {/* Row 1 — Security Question */}
      <div className="row mb-4 align-items-center">
        <div className="col-3">
          <label className="fw-semibold">Question</label>
        </div>

        <div className="col-1" style={{ width: "100px" }}></div>

        <div className="col">
          <p className="text-muted mb-0">{item.verificationQuestion}</p>
        </div>
      </div>

      {/* Row 2 — Answer Input */}
      <div className="row mb-2 align-items-center">
        <div className="col-3">
          <label className="fw-semibold">Your Answer</label>
        </div>

        <div className="col-1" style={{ width: "100px" }}></div>

        <div className="col">
          <input
            className="form-control p-3"
            placeholder="Enter your answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
      </div>

      {/* Row 3 — Upload Photo */}
      <div className="row  align-items-center">
        <div className="col-3">
          <label className="fw-semibold"></label>
        </div>

        <div className="col-1" style={{ width: "100px" }}></div>

        <div className="col">
          <UploadPhoto
            photoUrl={photoUrl}
            onUploaded={(url) => seturl({ url })}
          />
        </div>
      </div>

      {/* Row 4 — Nickname */}
      <div className="row  align-items-center">
        <div className="col-3">
          <label className="fw-semibold">Item</label>
        </div>

        <div className="col-1" style={{ width: "100px" }}></div>

        <div className="col">
          <p className="text-secondary mb-0">
            You found <strong>{item.nickname}</strong>.
          </p>
        </div>
      </div>

      {/* Row 5 — Continue Button */}
      <div className="row mt-4">
        <div className="col-3"></div>
        <div className="col-1" style={{ width: "100px" }}></div>

        <div className="col">
          {item.status === "CLOSED" ? (
            <p className="text-danger fw-semibold">This tag is inactive.</p>
          ) : (
            <CustomButton className="btn btn-primary w-100" onClick={onNext}>
              Continue
            </CustomButton>
          )}
        </div>
      </div>

    </div>
  );
}
import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import UploadPhoto from "../uploadPhoto/UploadPhoto";

export default function Step1ItemPreview({
  item,
  onNext,
  answer,
  photoUrl,
  seturl,
  setAnswer,
}) {
  const hasQuestion =
    item?.verificationQuestion && item.verificationQuestion.trim() !== "";

  const isAnswerValid = hasQuestion ? answer.trim().length > 0 : true;
  return (
    <div className="container py-5 px-4" style={{ maxWidth: "700px" }}>
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-2 text-dark">You found a lost item!</h1>
        <p className="text-muted fs-5">
          {hasQuestion
            ? "Help us verify it by answering this quick question from the owner."
            : "The owner will be thrilled! You can share a photo of the item below."}
        </p>
      </div>

      <div className="px-md-4">
        {hasQuestion && (
          <>
            <div className="question-section nl-animated-fade">
              <label
                className="d-block fw-bold small text-uppercase mb-4"
                style={{ color: "var(--nl-tech-blue)", letterSpacing: "1px" }}
              >
                Owner's Question
              </label>
              <h5 className="fw-bold text-dark mb-4">
                {/* <span className="text-danger me-1">*</span> */}
                {item.verificationQuestion}
              </h5>
            </div>

            <div className="answer-section mb-4">
              <label className="form-label fw-bold small text-muted  mb-2">
                <span className="text-danger me-1">*</span>Your Answer:
              </label>
              <textarea
                className="form-control"
                rows="4"
                style={{ resize: "none" }}
                placeholder="Describe the item to verify..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              {!isAnswerValid && (
                <div className="nl-animated-fade">
                  <small className="text-danger mt-1 d-block ms-2 fw-medium">
                    Please provide a brief answer to help the owner
                  </small>
                </div>
              )}
            </div>
          </>
        )}

        <div className="photo-section pb-4">
          <label className="form-label fw-bold small text-muted mb-2">
            Evidence Photo (Optional)
          </label>

          <UploadPhoto
            photoUrl={photoUrl}
          onUploaded={(url) => seturl(url)}

          />
        </div>

        {/* CTA */}
        <div className="pt-3 text-end">
          {item.status === "CLOSED" ? (
            <div className="alert alert-danger rounded-pill text-center fw-bold">
              This tag is inactive.
            </div>
          ) : (
            <CustomButton
              variant="primary"
              className="px-5 py-2"
              onClick={onNext}
              disabled={!isAnswerValid}
            >
              Next
            </CustomButton>
          )}
        </div>
      </div>
    </div>
  );
}

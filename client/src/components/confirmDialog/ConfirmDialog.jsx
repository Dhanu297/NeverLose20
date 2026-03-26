import React from "react";
import CustomButton from "../CustomButton/CustomButton";

export default function ConfirmDialog({
  open,
  message,
  onConfirm,
  onCancel,
  title,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed-top w-100 h-100 d-flex align-items-center justify-content-center px-3"
      style={{
        backgroundColor: "rgba(9, 32, 121, 0.6)",
        backdropFilter: "blur(9px)",
        zIndex: 9999,
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <div
        className="bg-white px-4 py-5  shadow-lg border-0 text-center animate__animated animate__fadeInUp"
        style={{
          maxWidth: "340px",
          width: "100%",
          borderRadius: "28px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
        }}
      >
        {/* Icon */}
        <div className="mb-3">
          <div className="d-flex justify-content-center mb-4 animate__animated animate__backInDown ">
            <div
              className="nl-icon-box"
              style={{
                width: "64px",
                height: "64px",
              }}
            >
              <i
                className="bi bi-printer"
                style={{
                  color: "var(--nl-success)",
                  fontSize: "28px",
                }}
              ></i>
            </div>
          </div>
        </div>

        <h4
          className="fw-bold mb-2"
          style={{ color: "#092079", fontSize: "1.25rem" }}
        >
          {title}
        </h4>

        <p className="text-muted mb-4 small px-1" style={{ lineHeight: "1.4" }}>
          {message}
        </p>

        <div className="vstack gap-2 px-2">
          <CustomButton
            onClick={onConfirm}
            className="btn btn-primary rounded-pill py-2 fw-bold w-100 border-0 shadow-sm"
            variant="primary"
          >
            Confirm
          </CustomButton>

          <CustomButton
            onClick={onCancel}
            className="btn btn-link text-muted text-decoration-none fw-bold w-100 py-1 small"
            variant="outline"
          >
            Cancel
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

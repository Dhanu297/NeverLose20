import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import CustomButton from "../components/CustomButton/CustomButton";
export default function GenericErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const title = location.state?.title || "Unexpected Error";
  const message = location.state?.message || "Something went wrong.";
  const details = location.state?.details;

  return (
    <MainLayout>
        <div className="max-w-xl mx-auto">
      <div className="min-vh-100 d-flex bg-white rounded-4 flex-column">
      

      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div
          className="container py-4 px-4 text-center"
          style={{ maxWidth: "700px" }}
        >
          <div className="d-flex justify-content-center mb-4 animate__animated animate__fadeIn">
            {/* Icon Neverlose */}
            <div
              className="rounded-4 mx-auto"
              style={{
                backgroundColor: "var(--nl-deep-blue)",
                width: "64px",
                height: "64px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 24px rgba(5, 21, 51, 0.12)",
              }}
            >
              <i
                className="bi bi-question-circle"
                style={{
                  color: "var(--nl-info)",
                  fontSize: "28px",
                }}
              ></i>
            </div>
          </div>

          {/* Text */}
          <div className="mb-4">
            <h1
              className="fw-bold mb-4"
              style={{ color: "var(--nl-deep-blue)", fontSize: "42px" }}
            >
              {title}
            </h1>

             <p className="lead mb-4">{message}</p>

        {details && (
          <pre
            className="bg-light p-3 rounded text-start mx-auto"
            style={{ maxWidth: 600 }}
          >
            {JSON.stringify(details, null, 2)}
          </pre>
        )}
          </div>

          {/* CTA */}
          <CustomButton
            onClick={() => navigate("/home")}
            variant="primary"
            className="px-5 py-3 mt-5"
            style={{
              borderRadius: "32px",
              fontSize: "18px",
              fontWeight: "600",
              transition: "transform 0.3s ease",
            }}
          >
            Explore Neverlose
          </CustomButton>
        </div>
      </div>
    </div>
    </div>
    </MainLayout>
  );
}

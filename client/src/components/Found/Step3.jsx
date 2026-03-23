import CustomButton from "../CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";

export default function Step3Success() {
  const navigate = useNavigate();

  return (
    <div className="container py-4 px-4" style={{ maxWidth: "700px" }}>
      {/*  Hero Badge */}
      <div className="d-flex justify-content-center mb-4 animate__animated animate__backInDown ">
        <div
          className="rounded-4"
          style={{
            backgroundColor: "var(--nl-deep-blue)",
            width: "64px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 16px rgba(5, 21, 51, 0.2)",
          }}
        >
          <i
            className="bi bi-hand-thumbs-up"
            style={{
              color: "var(--nl-success)",
              fontSize: "28px",
            }}
          ></i>
        </div>
      </div>

      <div className="text-center mb-5">
        <h1
          className="text-brand-gradient fw-bold mb-2 text-dark"
          style={{ fontSize: "60px" }}
        >
          You're a Hero!
        </h1>
        <h3>You've done something great today. </h3>
      </div>
      <div className="space-y-1 text-center">
        <p className="font-medium">
          The owner has been notified. Your kindness just made someone's day
          much better. They will contact you soon to coordinate the recovery.
        </p>
      </div>
      <div className="d-flex justify-content-center mt-5 pt-2">
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
          Discover Neverlose
        </CustomButton>
      </div>
    </div>
  );
}

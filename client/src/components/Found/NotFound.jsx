import CustomButton from "../CustomButton/CustomButton";
import NavBar from "../../components/navbar/NavBar";
import { useNavigate } from "react-router-dom";

export default function NotFound({ message }) {
  const navigate = useNavigate();
  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavBar isSticky={false} />

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
              Oops! We couldn't find this tag
            </h1>

            <p className="text-muted fs-5 mb-5 px-md-4">
              It seems like this QR code isn't registered in our system or has
              been deactivated. Please try scanning it again or check if the tag
              is damaged.
              <strong> Thank you for trying to help!</strong>
            </p>
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
  );
}

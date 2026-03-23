import mainLogoBlue from "../../assets/Neverlose-Main.svg";
import CustomButton from "../CustomButton/CustomButton";
import NavBar from "../../components/navbar/NavBar";
import { useNavigate } from "react-router-dom";

export default function NotFound({ message }) {
  const navigate = useNavigate();
  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavBar isSticky={false} />

      <div className="flex-grow-1 d-flex align-items-center justify-content-center p-4">
        <div
          className="bg-white rounded-4 shadow-lg p-5 text-center animate__animated animate__fadeIn"
          style={{ maxWidth: "650px", border: "none" }}
        >
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

          <div className="mb-4">
            <img
              src={mainLogoBlue}
              alt="Neverlose"
              style={{ width: "150px" }}
            />
          </div>

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

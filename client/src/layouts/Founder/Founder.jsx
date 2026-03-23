import React from "react";
import "./Founder.css";
import { Row, Col } from "react-bootstrap";
import NavBar from "../../components/navbar/NavBar";
import mainLogoWhite from "../../assets/Neverlose-LogoWhite-Main.svg";

export default function Founder({ right, leftImage, currentStep }) {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavBar isSticky={false} />

      <div className="py-4 mx-4">
        <div className="bg-white rounded-4 shadow-lg overflow-hidden w-100">
          <Row className="g-4">
            {" "}
            {/* Left side */}
            <Col
              md={5}
              className="d-none d-md-block p-0 border-0 position-relative"
            >
              <div
                className="h-100 bg-white border-0 position-relative d-flex align-items-center justify-content-center"
                style={{ minHeight: "600px", border: "none" }}
              >
                <img
                  key={currentStep}
                  src={leftImage}
                  alt="Neverlose Context"
                  className="w-100 h-100 object-fit-cover animate__animated animate__fadeIn"
                  style={{
                    objectPosition: "right",
                  }}
                />

                <div className="position-absolute bottom-0 start-50 translate-middle z-3 w-100 text-center">
                  <div className="animate__animated animate__fadeIn">
                    <img
                      src={mainLogoWhite}
                      alt="Neverlose"
                      style={{
                        width: "180px",
                        filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
                      }}
                    />
                  </div>
                </div>
              </div>
            </Col>
            {/* Right side */}
            <Col md={7} className="p-3 p-lg-3 d-flex align-items-center">
              <div className="w-100">{right}</div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

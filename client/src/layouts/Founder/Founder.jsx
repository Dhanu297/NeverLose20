import React from "react";
import "./Founder.css";
import { Navbar, Container, Row, Col, Card } from "react-bootstrap";
import logo from "../../assets/Neverlose-Wide.svg";
import heroImage from "../../assets/Founder.jpg";

export default function Founder({left,right}) {
  return (
    <div style={{ minHeight: "100vh" }}>
      
      {/* Brand Bar */}
      <Navbar bg="white" expand="lg" className="py-3 shadow-sm">
        <Container>
          <Navbar.Brand className="d-flex align-items-center">
            <img src={logo} alt="Brand Logo" height="40" className="me-2" />
            <span className="fw-semibold fs-5">Be someone's hero!!</span>
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Header Image */}
      <div
        style={{
          width: "100%",
          height: "200px",
          overflow: "hidden",
          position: "relative"
        }}
      >
        <img
          src={heroImage}
          alt="hero"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "fill"
          }}
        />
      </div>

      {/* Left + Right Only */}
      <Container className="MyContainer py-4 d-flex justify-content-center">
        <Card className="founder-card border-0 shadow-lg overflow-hidden align-items-center"
        style={{ maxWidth: "900px" }}>
        {/* Remove gutters using g-0 */}
        <Row className="g-0" style={{ width: "100%" }}>
          
          {/* LEFT PLACEHOLDER */}
          <Col   lg={4} md={4} sm={12}>
            <div  className="py-4 placeholder-box no-gap">{left}</div>
          </Col>

          {/* RIGHT PLACEHOLDER */}
          <Col  lg={8} md={8} sm={12}>
            <div className="py-4 placeholder-box no-gap">{right}</div>
          </Col>

        </Row>
        </Card>
      </Container>
    </div>
  );
}
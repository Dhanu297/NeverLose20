import React from "react";
import logo from "../../assets/Neverlose-Wide.svg";
import CustomButton from "../CustomButton/CustomButton";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md bg-white shadow-sm mt-3 mx-4 rounded-4 border">
      <div className="container-fluid px-4 py-1">
        {/* Logo */}
        <div className="navbar-logo d-flex align-items-center">
          <img
            src={logo}
            className="me-2"
            alt="Neverlose Logo"
            style={{ height: "37px" }}
          />
        </div>

        {/* Navigation links */}
        <div className="collapse navbar-collapse justify-content-center">
          <div className="navbar-nav gap-4">
            <a
              href="#how-it-works"
              className="nav-link text-muted fw-medium small"
            >
              How it Works
            </a>
            <a href="#features" className="nav-link text-muted fw-medium small">
              Features
            </a>
            <a
              href="#found-an-item"
              className="nav-link text-muted fw-medium small"
            >
              Found an Item?
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="d-flex align-items-center gap-2">
          <CustomButton variant="outline" className="btn-sm px-3">
            Log In
          </CustomButton>
          <CustomButton variant="primary" className="btn-sm px-3">
            Register
          </CustomButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

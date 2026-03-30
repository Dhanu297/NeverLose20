import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/Neverlose-Wide.svg";
import CustomButton from "../CustomButton/CustomButton";
import "./NavBar.css";

const Navbar = ({ isSticky = true }) => {
  const navigate = useNavigate();//Navigation hooks for routing
  const { pathname } = useLocation();
  const currentPath = pathname.toLowerCase();//Normalize current path for easy checks

  const isLanding = currentPath === "/home" || currentPath === "/";//Check if user is on landing page
  const isFinderPage =
    currentPath.includes("/f/") || currentPath.includes("/found/");//Check if user is on public finder pages (QR scan flow)

  const navbarClasses = [
    "navbar",
    "navbar-expand-md",
    "bg-white",
    "shadow-sm",
    "border",
    "rounded-4",
    isSticky ? "sticky-nav" : "",
    isLanding ? "navbar-landing" : "navbar-contained",
  ].join(" ");

  return (
    // Wrapper adds spacing and layout adjustments
    <div className={`nav-wrapper pt-3 ${isLanding ? "px-3" : "px-4"}`}>
      <nav className={navbarClasses}>
        <div className="container-fluid px-4 py-1">
          {/* Logo (redirects to home) */}
          <Link to="/home" className="navbar-brand">
            <img src={logo} alt="Neverlose" style={{ height: "37px" }} />
          </Link>

          {/* Navigation links */}
          <div className="collapse navbar-collapse justify-content-center">
            <div className="navbar-nav gap-5">
              <button
                onClick={() => navigate("/how-it-works")}
                className="nav-link-custom"
              >
                How it Works
              </button>
              <button
                onClick={() => navigate("/features")}
                className="nav-link-custom"
              >
                Features
              </button>
            </div>
          </div>

          {/* buttons (dynamic based on page type)*/}
          <div className="d-flex align-items-center gap-2">
            {isFinderPage ? (
              <CustomButton
                variant="primary"
                className="btn px-3"
                onClick={() => navigate("/signup")}
              >
                Get Started
              </CustomButton>
            ) : (
              <>
                <CustomButton
                  variant="outline"
                  className="btn-sm px-3"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </CustomButton>
                <CustomButton
                  variant="primary"
                  className="btn-sm px-3"
                  onClick={() => navigate("/signup")}
                >
                  Register
                </CustomButton>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

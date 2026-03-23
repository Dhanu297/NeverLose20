import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/Neverlose-Wide.svg";
import CustomButton from "../CustomButton/CustomButton";
import "./NavBar.css";

const Navbar = ({ isSticky = true }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLanding = location.pathname === "/home";
  const isFinderPage =
    location.pathname.includes("/f/") || location.pathname.includes("/found/");
  const isWelcomePage = location.pathname === "/";

  const navbarClasses = `navbar navbar-expand-md bg-white shadow-sm mt-3 mx-4 rounded-4 border ${
    isSticky ? "sticky-top" : ""
  }`;

  return (
    <nav className={navbarClasses}>
      <div className="container-fluid px-4 py-1">
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

        {/* CTA */}
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
  );
};

export default Navbar;

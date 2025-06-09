import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import "../styles/pageLayouts/navBar.scss";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="src/assets/images/logo.png" alt="GYM LOGO" />
      </div>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="menu-bar"></span>
        <span className="menu-bar"></span>
        <span className="menu-bar"></span>
      </div>

      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)} />
      )}

      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li className="close-icon" onClick={() => setMenuOpen(false)}>
          &times;
        </li>
        <li>
          <a className="links" href="#about">
            About Us
          </a>
        </li>
        <li>
          <a className="links" href="#how-it-works">
            How It Works
          </a>
        </li>
        <li>
          <a className="links" href="#pricing">
            Pricing
          </a>
        </li>
        <li className="mobile-buttons">
          <CustomButton component={RouterLink} to="/get-started" fullWidth>
            Get Started
          </CustomButton>
          <CustomButton
            size="medium"
            component={RouterLink}
            to="/login"
            bgColor="#ffffff"
            textColor="#1A85C8"
            fullWidth
          >
            Login
          </CustomButton>
        </li>
        <li className="mobile-buttons"></li>
      </ul>

      <div className="navbar-buttons">
        <CustomButton component={RouterLink} to="/get-started">
          Get Started
        </CustomButton>

        <CustomButton
          size="medium"
          component={RouterLink}
          to="/login"
          bgColor="#ffffff"
          textColor="#1A85C8"
          style={{ marginLeft: "1rem", border: "1px solid #1A85C8" }}
        >
          Login
        </CustomButton>
      </div>
    </nav>
  );
};

export default Navbar;

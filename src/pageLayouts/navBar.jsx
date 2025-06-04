import { Link as RouterLink } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import "../styles/pageLayouts/navBar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="src/assets/images/logo.png" alt="GYM LOGO" />
      </div>

      <ul className="navbar-links">
        <li>
          <a href="#about">About Us</a>
        </li>
        <li>
          <a href="#how-it-works">How It Works</a>
        </li>
        <li>
          <a href="#pricing">Pricing</a>
        </li>
      </ul>

      <div className="navbar-buttons">
        <CustomButton  component={RouterLink} to="/get-started">
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

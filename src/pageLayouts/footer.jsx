import "../styles/pageLayouts/footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import WhiteLogo from "../assets/images/whiteLogo.png"
import FooterImg from "../assets/images/footerImg.png"

const Footer = () => {
  return (
    <div className="footer-container">
       
      <div className="footer-content">
        <div className="footer-logo">
          <img src={WhiteLogo} alt="Gym Logo" />
          <div className="social-icons">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
          </div>
        </div>

        <img src={FooterImg} alt="Footer Image" className="footer-gym" />

        <div className="footer-links">
          <ul>
            <li>
              <a href="#about">Explore</a>
            </li>
            <li>
              <a href="#meet-trainers">About Us</a>
            </li>
            <li>
              <a href="#how-it-works" className="terms">How It Works</a>
            </li>
            <li>
              <a href="#testimony" >Pricing</a>
            </li>
            <li>
              <a href="#testimony" className="terms">Contact Us</a>
            </li>
            <li>
              <a href="#pricing">FAQ</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          <p>
            &copy; {new Date().getFullYear()} AktiveGym. All rights reserved.
          </p>
        </div>

        <div>
          <p className="footer-designer">
            Designed by {""}
            <a href="https://github.com/Bobby1896/AktiveGym">Jonathan Alabi</a>
          </p>
        </div>

        <div className="footer-terms">
          <ul>
            <li>
              <a href="/" className="terms">Terms of conditions</a>
            </li>
            <li>
              <a href="/" className="terms">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
     
    </div>
  );
};

export default Footer;

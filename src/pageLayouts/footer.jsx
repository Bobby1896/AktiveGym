import "../styles/pageLayouts/footer.scss";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="src/assets/images/logo.png" alt="Gym Logo" />
          <div className="social-icons">
            <a href="www.instagram.com" target="blank">
              <i className="fa fa-instagram"></i>
            </a>
            <a href="www.facebook.com" target="blank">
              <i className="fa fa-facebook"></i>
            </a>

            <a href="www.x.com" target="blank">
              <i className="fa fa-x"></i>
            </a>
          </div>
        </div>

        <img src="src/assets/images/footerImg.png" alt="Footer Image" />

        <div className="footer-links">
          <ul>
            <li>
              <a href="#about">Explore</a>
            </li>
            <li>
              <a href="#meet-trainers">About Us</a>
            </li>
            <li>
              <a href="#how-it-works">How It Works</a>
            </li>
            <li>
              <a href="#testimony">Pricing</a>
            </li>
            <li>
              <a href="#testimony">Contact Us</a>
            </li>
            <li>
              <a href="#pricing">FAQ</a>
            </li>
          </ul>
        </div>

      
      </div>
        <hr />
        
      <div className="footer-bottom">
        <div>
          <p>
            &copy; {new Date().getFullYear()} AktiveGym. All rights reserved.
          </p>
          <p>
            Designed by <a href="/">Jonathan Alabi</a>
          </p>
        </div>

        <div>
          <ul>
            <li>
              <a href="/">Terms of conditions</a>
            </li>
            <li>
              <a href="/">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;

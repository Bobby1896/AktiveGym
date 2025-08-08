import { useState, useEffect } from "react";
import Navbar from "../pageLayouts/navBar";
import "../styles/pages/landingPage.scss";
import CustomButton from "../components/CustomButton";
import { Link as RouterLink } from "react-router-dom";
import About from "./about";
import MeetTrainers from "./meetTrainers";
import Steps from "./steps";
import Testimony from "./testimony";
import Membership from "./membership";
import { FAQData } from "../utils/plainData";
import Footer from "../pageLayouts/footer";
import Nike from "../assets/images/nike.png";
import Bulk from "../assets/images/bulk.png";
import Gym from "../assets/images/gymshark.png";
import FreshFit from "../assets/images/freshfit.png";
import Protein from "../assets/images/myprotein.png";

const LandingPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const buttonSize = windowWidth <= 768 ? "small" : "large";

  const toggleAccordion = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };
  return (
    <div className="home-container">
      <div className="hero-background">
        <Navbar />
        <section className="hero-section">
          <div className="container">
            <div className="hero-text">
              <h1 className="hero-title">
                TRAIN SMARTER. <br />
                LIVE LONGER.
              </h1>
              <p className="hero-subtitle">
                Welcome to AktiveGym – your all-in-one <br />
                destination for fitness, wellness, and lifestyle <br />
                transformation.
              </p>

              <CustomButton
                component={RouterLink}
                size={buttonSize}
                to="/signup"
                className="explore"
              >
                Explore Plan
              </CustomButton>
            </div>
          </div>
        </section>

        <section className="sponsor-section">
          <div className="sponsor-slider">
            <div className="slide-track">
              <img src={Nike} alt="NIKE" />
              <img src={Protein} alt="MY PROTEIN" />
              <img src={Bulk} alt="BULK" />
              <img src={Gym} alt="GYM SHARK" />
              <img src={FreshFit} alt="FRESH FIT" />

              <img src={Nike} alt="NIKE" />
              <img src={Protein} alt="MY PROTEIN" />
              <img src={Bulk} alt="BULK" />
              <img src={Gym} alt="GYM SHARK" />
              <img src={FreshFit} alt="FRESH FIT" />
            </div>
          </div>
        </section>
      </div>

      <main className="container">
        <section id="about">
          <About />
        </section>

        <section id="meet-trainers">
          <MeetTrainers />
        </section>

        <section id="how-it-works">
          <Steps />
        </section>

        <section id="testimony">
          <Testimony />
        </section>

        <section id="pricing">
          <Membership />
        </section>

        <section>
          <div className="FAQ-section">
            <h1 className="FAQ-title">Frequently Asked Questions</h1>
            <p className="FAQ-subtitle">Your questions resolved in one place</p>

            <div className="FAQ-content">
              {FAQData.map((faq, index) => (
                <div key={index} className="accordion-item">
                  <div
                    className="accordion-header"
                    onClick={() => toggleAccordion(index)}
                  >
                    <h3>{faq.question}</h3>
                    <span>{openIndex === index ? "-" : "+"}</span>
                  </div>
                  {openIndex === index && (
                    <div className="accordion-body">
                      {Array.isArray(faq.answer) ? (
                        faq.answer.map((line, i) => <p key={i}>{line}</p>)
                      ) : (
                        <p>{faq.answer}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default LandingPage;

import { useState} from "react";
import Navbar from "../pageLayouts/navBar";
import "../styles/pages/landingPage.scss";
import CustomButton from "../components/CustomButton";
import { Link as RouterLink } from "react-router-dom";
import About from "./about";
import MeetTrainers from "./meetTrainers";
import Steps from "./steps";
import Testimony from "./testimony";
import Membership from "./membership";
import { FAQData } from "../plainData";
import Footer from "../pageLayouts/footer";

const LandingPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };
  return (
    <>
      <div className="hero-background">
        <Navbar />
        <section className="hero-section">
          <div className="container">
            <h1 className="hero-title">
              TRAIN SMARTER. <br />
              LIVE LONGER.
            </h1>
            <p className="hero-subtitle">
              Welcome to AktiveGym – your all-in-one <br />
              destination for fitness, wellness, and lifestyle <br />
              transformation.
            </p>

            <CustomButton component={RouterLink} size="large" to="/signUp">
              Explore Plan
            </CustomButton>
          </div>
        </section>

        <section className="sponsor-section">
          <div className="sponsor-slider">
            <div className="slide-track">
              <img src="src/assets/images/nike.png" alt="NIKE" />
              <img src="src/assets/images/myprotein.png" alt="MY PROTEIN" />
              <img src="src/assets/images/bulk.png" alt="BULK" />
              <img src="src/assets/images/gymshark.png" alt="GYM SHARK" />
              <img src="src/assets/images/freshfit.png" alt="FRESH FIT" />

              <img src="src/assets/images/nike.png" alt="NIKE" />
              <img src="src/assets/images/myprotein.png" alt="MY PROTEIN" />
              <img src="src/assets/images/bulk.png" alt="BULK" />
              <img src="src/assets/images/gymshark.png" alt="GYM SHARK" />
              <img src="src/assets/images/freshfit.png" alt="FRESH FIT" />
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
    </>
  );
};

export default LandingPage;

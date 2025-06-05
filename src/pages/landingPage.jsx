import Navbar from "../pageLayouts/navBar";
import "../styles/pages/landingPage.scss";
import CustomButton from "../components/CustomButton";
import { Link as RouterLink } from "react-router-dom";
import About from "./about";
import MeetTrainers from "./meetTrainers";

const LandingPage = () => {
  return (
    <>
      <div className="hero-background">
        <Navbar />
        <section className="hero-section">
          <h1 className="hero-title">
            TRAIN SMARTER.{" "}
            <span>
              <br />
            </span>{" "}
            LIVE LONGER.
          </h1>
          <p className="hero-subtitle">
            Welcome to AktiveGym – your all-in-one <br />
            destination for fitness, wellness, and lifestyle <br />
            transformation.
          </p>

          <CustomButton component={RouterLink} size="large" to="/get-started">
            Explore Plan
          </CustomButton>
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

      <section id="about">
        <About />
      </section>

      <section id="meet-trainers">
        <MeetTrainers/>
      </section>


      <section
        id="how-it-works"
        style={{ minHeight: "100vh", padding: "2rem" }}
      >
        <h2>How It Works</h2>
        <p>Details about how it works.</p>
      </section>

      <section id="pricing" style={{ minHeight: "100vh", padding: "2rem" }}>
        <h2>Pricing</h2>
        <p>Your pricing details go here.</p>
      </section>
    </>
  );
};

export default LandingPage;

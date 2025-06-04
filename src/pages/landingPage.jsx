import Navbar from "../pageLayouts/navBar";
import "../styles/pages/landingPage.scss";

const LandingPage = () => {
  return (
    <div>
      <div className="hero-background">
        <Navbar />
        <section className="hero-section">

        </section>
      </div>

      <section id="about" style={{ minHeight: "100vh", padding: "2rem" }}>
        <h2>About Us</h2>
        <p>Some content about your service.</p>
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
    </div>
  );
};

export default LandingPage;

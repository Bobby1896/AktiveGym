import "../styles/pages/about.scss";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-text">
        <p className="about-header">About AktiveGym</p>

        <h1>
          STRONGER TOGETHER. <br /> BUILT FOR EVERYBODY.
        </h1>
        <p>
          At AktiveGym, we’re redefining fitness for <br /> students,
          professionals, and athletes through <br /> expert coaching, community,
          and a tailored <br />
          wellness experience. Whether you're just <br /> starting out or
          chasing elite performance
        </p>
      </div>

      <div className="about-image">
        <img src="src/assets/images/about.png" alt="About Image" />
      </div>
    </div>
  );
};

export default About;

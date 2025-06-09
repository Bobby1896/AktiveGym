import "../styles/pages/about.scss";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-text">
        <p className="about-header">About AktiveGym</p>

        <h1>STRONGER TOGETHER. BUILT FOR EVERYBODY.</h1>
        <p>
          At AktiveGym, we’re redefining fitness for students, professionals,
          and athletes through expert coaching, community, and a tailored
          wellness experience. Whether you're just starting out or chasing elite
          performance
        </p>
      </div>

      <div className="about-image">
        <img src="src/assets/images/about.png" alt="About Image" />
      </div>
    </div>
  );
};

export default About;

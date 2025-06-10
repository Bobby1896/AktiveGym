import { useState } from "react";
import "../styles/authentication/signUp.scss";
import {
  AccountIcon,
  GymIcon,
  SubscribeIcon,
  EyeIcon,
  EyeClosedIcon,
} from "../svg";
import BasicTextField from "../components/TextInput";

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="signup-container">
      <div className="progress-section">
        <img
          src="src/assets/images/white logo.png"
          alt="AktiveGym Logo"
          className="logo"
        />

        <div className="progress-steps">
          <div
            className={`step-indicator ${currentStep === 1 ? "active" : ""}`}
          >
            <AccountIcon />
            <div className="step-info">
              <h4>Create Your Account</h4>
              <p>You're almost in - just set your account</p>
            </div>
          </div>

          <div
            className={`step-indicator ${currentStep === 2 ? "active" : ""}`}
          >
            <GymIcon />
            <div className="step-info">
              <h4>Fitness & Body Info</h4>
              <p>Help us personalize your fitness experience.</p>
            </div>
          </div>

          <div
            className={`step-indicator ${currentStep === 3 ? "active" : ""}`}
          >
            <SubscribeIcon />
            <div className="step-info">
              <h4>Subscribe To A Plan</h4>
              <p>Subscribe to a plan of your choice to get started</p>
            </div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <div className="step-counter">
          <p>Step {currentStep} of 3</p>
        </div>

        <h2 className="form-title">
          {currentStep === 1 && "Create your Account"}
          {currentStep === 2 && "Your Fitness Profile"}
          {currentStep === 3 && "Choose Your Plan"}
        </h2>

        {currentStep === 1 && (
          <form className="form-step">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <BasicTextField
                id="fullName"
                type="text"
                className="custom-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <BasicTextField
                id="email"
                type="email"
                className="custom-input"
              />
            </div>

            <div className="gs-group">
              <div className="gender-group">
                <label>Gender</label>

                <div className="radio-group">
                  <div className="radio-option1">
                    <input type="radio" id="male" name="gender" value="male" />
                    <label htmlFor="male">Male</label>
                  </div>

                  <div className="radio-option2">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                </div>
              </div>
              <div className="age-group">
                <label htmlFor="age">Age</label>
                <BasicTextField
                  id="age"
                  type="number"
                  className="small-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <BasicTextField
                id="password"
                type={showConfirmPassword ? "text" : "password"}
                className="medium-input"
                endAdornment={
                  <div
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
                  </div>
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <BasicTextField
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="medium-input"
                endAdornment={
                  <div
                    className="password-toggle"
                    onClick={toggleConfirmPasswordVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    {showConfirmPassword ? <EyeClosedIcon /> : <EyeIcon />}
                  </div>
                }
              />
            </div>
          </form>
        )}
        {currentStep === 2 && (
          <div className="form-step">
            {/* Fitness info fields would go here */}
          </div>
        )}

        {currentStep === 3 && (
          <div className="form-step">
            {/* Subscription plans would go here */}
          </div>
        )}

        <div className="form-actions">
          {currentStep > 1 && (
            <button
              className="secondary-button"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Back
            </button>
          )}
          <button
            className="primary-button"
            onClick={() =>
              currentStep < 3 ? setCurrentStep(currentStep + 1) : ""
            }
          >
            {currentStep < 3 ? "Next" : "Complete Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

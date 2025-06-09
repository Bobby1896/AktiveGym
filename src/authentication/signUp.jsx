import { useState } from "react";
import "../styles/authentication/signUp.scss";
import { AccountIcon, GymIcon, SubscribeIcon } from "../svg";
import BasicTextField from "../components/TextInput";


const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(1);

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
          <div className="form-step">
            <BasicTextField label="Full Name" type="text" fullWidth />
            <BasicTextField label="Email" type="email" fullWidth />
            <div className="radio-group">
              <label>Gender</label>
              <div>
                <input type="radio" id="male" name="gender" value="male" />
                <label htmlFor="male">Male</label>
                <input type="radio" id="female" name="gender" value="female" />
                <label htmlFor="female">Female</label>
              </div>
            </div>
            <BasicTextField label="Age" type="number" fullWidth />
            <BasicTextField label="Password" type="password" fullWidth />
            <BasicTextField
              label="Confirm Password"
              type="password"
              fullWidth
            />
          </div>
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

import { useState } from "react";
import "../styles/authentication/signUp.scss";
import {
  AccountIcon,
  GymIcon,
  SubscribeIcon,
  EyeIcon,
  EyeClosedIcon,
} from "../svg";
import { Formik, Form, Field } from "formik";
import { schema } from "../schema";

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    age: "",
    gender: "",
    password: "",
    cpassword: "",
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
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={""}
          >
            {({ errors, touched }) => (
              <Form className="signup-form">
                <div className="form-field">
                  <label htmlFor="name">Full Name</label>

                  <Field type="text" name="name" className="custom-input" />
                  <div className="error-containner">
                    {errors.name && touched.name && (
                      <p className="error-msg">{errors.name}</p>
                    )}
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="email">Email</label>

                  <Field type="email" name="email" className="custom-input" />
                  {errors.email && touched.email && (
                    <p className="error-msg">{errors.email}</p>
                  )}
                </div>

                <div className="gs-field">
                  <div className="form-field">
                    <label htmlFor="gender">Gender</label>
                    <div className="gender-options">
                      <div className="male-option">
                        <label>
                          <Field
                            type="radio"
                            name="gender"
                            value="male"
                            className="age-input"
                          />
                          Male
                        </label>
                      </div>
                      <div className="female-option">
                        <label>
                          <Field
                            type="radio"
                            name="gender"
                            value="female"
                            className="age-input"
                          />
                          Female
                        </label>
                      </div>
                    </div>
                    {errors.gender && touched.gender && (
                      <p className="error-msg">{errors.gender}</p>
                    )}
                  </div>

                  <div className="age-field">
                    <label htmlFor="age">Age</label>
                    <Field type="age" name="age" className="custom-input" />
                    {errors.age && touched.age && (
                      <p className="error-msg">{errors.age}</p>
                    )}
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="password">Password</label>
                  <div className="password-field">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="custom-input"
                    />
                    <span
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
                    </span>
                  </div>
                  {errors.password && touched.password && (
                    <p className="error-msg">{errors.password}</p>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="cpassword">Confirm Password</label>
                  <div className="password-field">
                    <Field
                      type={showConfirmPassword ? "text" : "password"}
                      name="cpassword"
                      className="custom-input"
                    />
                    <span
                      className="toggle-password"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <EyeClosedIcon /> : <EyeIcon />}
                    </span>
                  </div>
                  {errors.cpassword && touched.cpassword && (
                    <p className="error-msg">{errors.cpassword}</p>
                  )}
                </div>
              </Form>
            )}
          </Formik>
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

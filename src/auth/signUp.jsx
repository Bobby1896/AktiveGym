import { useState, useEffect } from "react";
import * as Yup from "yup";
import "../styles/auth/signUp.scss";
import { FullSubscriptionIcon } from "../utils/svg";
import {
  AccountIcon,
  GymIcon,
  SubscribeIcon,
  EyeIcon,
  EyeClosedIcon,
  BackArrowIcon,
} from "../utils/svg";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
} from "react-icons/fa";
import { getCardIssuer } from "../schema/cardIssuer";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import { useSignUpMutation } from "../redux/services/signUpApi";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import BasicModal from "../components/BasicModal";
import { SuccessIcon } from "../utils/svg";

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signUpData, { isLoading }] = useSignUpMutation();
  const [cardType, setCardType] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedPlan, setSelectedPlan] = useState(
    location.state?.selectedPlan || {
      id: "regular",
      name: "Regular",
      value: "REGULAR",
      price: 12,
      billingCycle: "monthly",
    }
  );

  const initialValues = {
    name: "",
    cardName: "",
    email: "",
    age: "",
    gender: "",
    password: "",
    cpassword: "",
    membershipPlan: selectedPlan.value,
    cvv: "",
    cardNumber: "",
    expiryDate: "",
    diet: "",
    height: "",
    weight: "",
    fitnessGoal: "",
  };
  const renderCardLogo = () => {
    switch (cardType) {
      case "visa":
        return <FaCcVisa className="card-icon" />;
      case "mastercard":
        return <FaCcMastercard className="card-icon" />;
      case "amex":
        return <FaCcAmex className="card-icon" />;
      case "discover":
        return <FaCcDiscover className="card-icon" />;
      default:
        return null;
    }
  };
  useEffect(() => {
    localStorage.setItem("selectedPlan", JSON.stringify(selectedPlan));
  }, [selectedPlan]);

  const handleSubmit = async (values) => {
    const validFitnessGoals = [
      "BUILD_MUSCLE",
      "LOOSE_WEIGHT",
      "GET_FLEXIBLE",
      "IMPROVE_STAMINA",
      "GAIN_WEIGHT",
    ];

    const goals = Array.isArray(values.fitnessGoal)
      ? values.fitnessGoal
      : [values.fitnessGoal];

    const payload = {
      fullName: values.name,
      email: values.email,
      gender: values.gender?.toUpperCase(),
      age: Number(values.age),
      password: values.password,
      confirmPassword: values.cpassword,
      membershipPlan: values.membershipPlan?.toUpperCase(),
      fitnessAndBodyInfo: {
        weight: parseFloat(values.weight),
        height: parseFloat(values.height) / 100,
        dietaryPreference: values.diet?.toUpperCase(),
        fitnessGoal: goals
          .map((goal) => goal.toUpperCase().replace(/-/g, "_"))
          .filter((goal) => validFitnessGoals.includes(goal)),
      },

      paymentInfo: {
        cardName: values.cardName,
        cardNumber: values.cardNumber?.replace(/\s/g, ""),
        expiryDate: String(values.expiryDate),
        cvv: String(values.cvv),
      },
    };

    try {
      await signUpData(payload).unwrap();
      setShowModal(true);
      toast.success(
        signUpData?.message || "Sign up successful! Please log in to continue."
      );
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.error || "Error signing up");
    }
    console.log("Payload to send:", JSON.stringify(payload, null, 2));
  };

  const passwordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  const cardNumberRegex = /^(\d{4}\s){3}\d{4}$/;
  const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
  const cvvRegex = /^[0-9]{3,4}$/;

  const signUpSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Please enter your name"),
    cardName: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Please enter your name"),
    email: Yup.string()
      .email("Please enter valid email")
      .required("Please enter your email"),
    password: Yup.string()
      .matches(
        passwordRegex,
        "Please enter valid password with at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Please enter your password"),
    cpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Please confirm your password"),
    gender: Yup.string().required("Please select your gender"),
    age: Yup.number()
      .min(1, "Age must be a number and at leaast 1")
      .max(100, "Please enter a valid age")
      .required("Please enter your age"),
    height: Yup.number()
      .min(1, "Height must be a number and at least 1")
      .required("Please enter your height"),
    weight: Yup.number()
      .min(1, "Weight must be a number and at least 1")
      .required("Please enter your weight"),
    cardNumber: Yup.string()
      .matches(cardNumberRegex, "Card number must be 16 digits")
      .required("Please enter your card number"),
    expiryDate: Yup.string()
      .matches(
        expiryDateRegex,
        "Expiry date must be in MM/YYYY format (e.g., 09/2025)"
      )
      .test(
        "is-future-date",
        "Expiry date must be in the future",
        function (value) {
          if (!value) return false;

          const [month, year] = value.split("/").map(Number);
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();
          const currentMonth = currentDate.getMonth() + 1;

          return (
            year > currentYear ||
            (year === currentYear && month >= currentMonth)
          );
        }
      )
      .required("Please enter your card's expiry date"),
    cvv: Yup.string()
      .matches(cvvRegex, "CVV must be 3 or 4 digits")
      .required("Please enter your card's CVV"),
    // billingCountry: Yup.string().required("Please select your billing country"),
    // zipCode: Yup.string()
    //   // .matches(/^\d{5}$/, "Zip code must be exactly 5 digits")
    //   .required("Please enter your zip code"),
  });

  return (
    <div className="signup-container">
      <div className="progress-section">
        <img
          src="src/assets/images/whiteLogo.png"
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

        <div className="spacer" />
        <Link to={"/"}>
          <div className="return-home">
            <BackArrowIcon />
            <p>Back to home</p>
          </div>
        </Link>
      </div>

      <div className="form-section">
        <div className="step-counter">
          <p>Step {currentStep} of 3</p>
        </div>

        <h2 className="form-title">
          {currentStep === 1 && "Create your Account"}
          {currentStep === 2 && "Fitness & Body Info"}
          {currentStep === 3 && "Subscribe to a Plan"}
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={signUpSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue, isValid, dirty }) => (
            <Form id="signup-form" className="signup-form">
              {currentStep === 1 && (
                <>
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
                        {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
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
                        {showConfirmPassword ? <EyeIcon /> : <EyeClosedIcon />}
                      </span>
                    </div>
                    {errors.cpassword && touched.cpassword && (
                      <p className="error-msg">{errors.cpassword}</p>
                    )}
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="bmi-field">
                    <div className="height-field">
                      <label htmlFor="height">Height (cm)</label>
                      <Field
                        type="number"
                        name="height"
                        className="custom-input"
                      />
                      {errors.height && touched.height && (
                        <p className="error-msg">{errors.height}</p>
                      )}
                    </div>

                    <div className="weight-field">
                      <label htmlFor="weight">Weight (kg)</label>
                      <Field
                        type="number"
                        name="weight"
                        className="custom-input"
                      />
                      {errors.weight && touched.weight && (
                        <p className="error-msg">{errors.weight}</p>
                      )}
                    </div>
                  </div>

                  <div className="form-field">
                    <div className="">
                      <label htmlFor="fitnessGoal">Fitness Goal</label>
                      <div className="diet-options">
                        <div className="vegan-option">
                          <label>
                            <Field
                              type="checkbox"
                              name="fitnessGoal"
                              value="lose-weight"
                              className="diet-input"
                            />
                            Lose Weight
                          </label>
                        </div>

                        <div className="hp-option">
                          <label>
                            <Field
                              type="checkbox"
                              name="fitnessGoal"
                              value="build-muscle"
                              className="diet-input"
                            />
                            Build Muscle
                          </label>
                        </div>

                        <div className="np-option">
                          <label>
                            <Field
                              type="checkbox"
                              name="fitnessGoal"
                              value="get-flexible"
                              className="diet-input"
                            />
                            Get Flexible
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-field">
                    <div className="">
                      <label htmlFor="dietary">Dietary Preference</label>
                      <div className="diet-options">
                        <div className="vegan-option">
                          <label>
                            <Field
                              type="radio"
                              name="diet"
                              value="vegan"
                              className="diet-input"
                            />
                            Vegan
                          </label>
                        </div>

                        <div className="hp-option">
                          <label>
                            <Field
                              type="radio"
                              name="diet"
                              value="high-protein"
                              className="diet-input"
                            />
                            High Protein
                          </label>
                        </div>

                        <div className="np-option">
                          <label>
                            <Field
                              type="radio"
                              name="diet"
                              value="no-preference"
                              className="diet-input"
                            />
                            No Preference
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <div className="payment-section">
                  <div className="payment-header">
                    <div className="">
                      <p className="payment-title">
                        Subscribe to {selectedPlan.name}
                      </p>
                      <p>
                        <span className="payment-amount">
                          ${selectedPlan.price}
                        </span>
                        {"/month"}
                      </p>
                    </div>
                    <FullSubscriptionIcon className="subscription-icon" />
                  </div>

                  <div>
                    <div className="payment-details">
                      <p className="payment-title">Regular Subscription Plan</p>
                      <p>${selectedPlan.price}</p>
                    </div>

                    <p>
                      Billed{" "}
                      {selectedPlan.billingCycle === "monthly"
                        ? "Monthly"
                        : "Yearly"}
                    </p>
                  </div>

                  <hr />

                  <div className="subtotal">
                    <p>Subtotal</p>
                    <p>{setSelectedPlan.price}</p>
                  </div>

                  <hr className="line" />
                  <div className="form-field">
                    <label htmlFor="cardNumber">Card Number</label>
                    <div className="card-input-wrapper">
                      <Field
                        type="text"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="custom-input "
                        autoComplete="cc-number"
                        onChange={(e) => {
                          const value = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 16);

                          const formattedValue = value.replace(
                            /(\d{4})(?=\d)/g,
                            "$1 "
                          );

                          setCardType(getCardIssuer(value)); // Detect issuer
                          setFieldValue("cardNumber", formattedValue);
                        }}
                      />
                      <div className="card-issuer">{renderCardLogo()}</div>
                    </div>

                    {errors.cardNumber && touched.cardNumber && (
                      <p className="error-msg">{errors.cardNumber}</p>
                    )}
                  </div>

                  <div className="expiry-cvv-fields">
                    <div className="expiry-field">
                      <label htmlFor="expiryDate">Expiration Date</label>
                      <Field
                        type="text"
                        name="expiryDate"
                        className="custom-input"
                        placeholder="MM / YY"
                        autoComplete="cc-exp"
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, "");
                          if (value.length > 2) {
                            value = `${value.slice(0, 2)}/${value.slice(2, 6)}`;
                          }
                          setFieldValue("expiryDate", value);
                        }}
                      />

                      {errors.expiryDate && touched.expiryDate && (
                        <p className="error-msg">{errors.expiryDate}</p>
                      )}
                    </div>

                    <div className="cvv-field">
                      <label htmlFor="cvv">Security Code</label>
                      <Field
                        type="number"
                        name="cvv"
                        className="custom-input"
                        placeholder="cvc"
                        autoComplete="cc-csc"
                      />
                      {errors.cvv && touched.cvv && (
                        <p className="error-msg">{errors.cvv}</p>
                      )}
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="cardOwner-name">Cardholder Name</label>
                    <Field
                      type="text"
                      name="cardName"
                      className="custom-input"
                      placeholder="Full name on Card"
                    />
                    {errors.cardName && touched.cardName && (
                      <p className="error-msg">{errors.cardName}</p>
                    )}
                  </div>

                  <div className="terms-conditions">
                    <label>
                      <Field
                        type="checkbox"
                        name="terms"
                        className="terms-checkbox"
                        required
                      />
                    </label>
                    <p className="terms-text">
                      You will be charged the amount and at the frequency listed
                      above until you cancel. We may change our prices as
                      described in our Terms of Use. You can cancel any time.
                    </p>
                  </div>
                </div>
              )}

              <div className="form-actions">
                {currentStep > 1 && (
                  <CustomButton
                    size="medium"
                    bgColor="#ffffff"
                    textColor="#1A85C8"
                    style="secondary-button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Back
                  </CustomButton>
                )}

                {currentStep === 3 ? (
                  <CustomButton
                    type="submit"
                    className="primary-button"
                    disabled={!isValid || !dirty || isLoading}
                  >
                    {isLoading ? "Processing..." : "Sign Up"}
                  </CustomButton>
                ) : (
                  <CustomButton
                    type="button"
                    className="primary-button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                  >
                    Next
                  </CustomButton>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <BasicModal
        isOpen={showModal}
        icon={<SuccessIcon />}
        onClose={() => setShowModal(false)}
        title="PAYMENT SUCCESSFUL"
        subTitle="Thank you for joining the AktiveGym community — your journey to a stronger, healthier you starts now."
        buttonText="Continue"
        onContinue={() => {
          setShowModal(false);
          navigate("/dashboard");
        }}
      />
    </div>
  );
};

export default SignUp;

import { useState } from "react";
import { Link as RouterLink, Link } from "react-router-dom";
import "../styles/authentication/login.scss";
import { Formik, Form, Field } from "formik";
import { schema } from "../schema";
import CustomButton from "../components/CustomButton";
import { EyeClosedIcon, EyeIcon } from "../svg";
import { WhiteGymLogo } from "../svg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img
          src="src/assets/images/loginImg.png"
          
          alt="Image on Login Page"
        />
      </div>

      <div className="login-form-container">
        <img src="src/assets/images/white logo.png" className="login-imagery" alt="White Logo" />
        <h2 className="login-header">Login to your Account</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={""}
        >
          {({ errors, touched }) => (
            <Form className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field name="email" type="email" className="custom-input" />
                {errors.email && touched.email && (
                  <p className="error-msg">{errors.email}</p>
                )}
              </div>

              <div className="form-group">
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

              <div className="login-button">
                <CustomButton
                  type="submit"
                  component={RouterLink}
                  to="/dashboard"
                  size="large"
                >
                  Login
                </CustomButton>
              </div>

              <div>
                <p>
                  Don't have an account?{" "}
                  <span className="sign-up-link">
                    <Link to="/signup" className="signup-link">
                      Sign Up
                    </Link>
                  </span>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;

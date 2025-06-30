import { useState } from "react";
import * as Yup from "yup";
import { Link as RouterLink, Link, useNavigate } from "react-router-dom";
import "../styles/auth/login.scss";
import { Formik, Form, Field } from "formik";
import CustomButton from "../components/CustomButton";
import { EyeClosedIcon, EyeIcon, SuccessIcon } from "../svg";
import { useLoginMutation } from "../redux/services/loginApi";
import { toast } from "react-toastify";
import BasicModal from "../components/BasicModal";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, { isLoading }] = useLoginMutation();
  const initialValues = {
    email: "",
    password: "",
  };
  console.log(loginData, "okjg");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const payload = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await loginData(payload).unwrap();

      localStorage.setItem("token", response.token);
      localStorage.setItem("expiresIn", response.expiresIn);
      toast.success(loginData?.message || "Login Successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.data?.message || "Error Logining");
    }
  };

  const passwordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  const loginSchema = Yup.object({
    email: Yup.string()
      .email("Please enter valid email")
      .required("Please enter your email"),
    password: Yup.string()
      .matches(
        passwordRegex,
        "Please enter valid password with at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Please enter your password"),
  });

  return (
    <div className="login-container">
      <div className="login-image">
        <img src="src/assets/images/loginImg.png" alt="Image on Login Page" />
      </div>

      <div className="login-form-container">
        <img
          src="src/assets/images/whiteLogo.png"
          className="login-imagery"
          alt="White Logo"
        />
        <h2 className="login-header">Login to your Account</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
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
                <CustomButton type="submit" size="large" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Login"}
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

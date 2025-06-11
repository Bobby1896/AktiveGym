import * as Yup from "yup";

const passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
// const emailRegex = new RegExp("^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$");

export const schema = Yup.object({
  name: Yup.string()
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
});

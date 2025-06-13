import * as Yup from "yup";

const passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
const cardNumberRegex = /^(\d{4}\s){3}\d{4}$/;
const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
const cvvRegex = /^[0-9]{3,4}$/;

// const emailRegex = ("^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$");

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
          year > currentYear || (year === currentYear && month >= currentMonth)
        );
      }
    )
    .required("Please enter your card's expiry date"),
  cvv: Yup.string()
    .matches(cvvRegex, "CVV must be 3 or 4 digits")
    .required("Please enter your card's CVV"),
});

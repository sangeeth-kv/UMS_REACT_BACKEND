import * as Yup from "yup";

const signupSchema = Yup.object().shape({
  fullname: Yup.string()
    .trim()
    .min(3, "Full name must be at least 3 characters")
    .matches(/^[A-Za-z ]+$/, "Name should contain only letters")
    .required("Full name is required"),

  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),

  phone: Yup.string()
    .trim()
    .matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits")
    .required("Phone number is required"),
password: Yup.string()
  .trim()
  .min(6, "Password must be at least 6 characters")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain one special character")
  .required("Password is required"),

  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required")
});

export default signupSchema;

import * as Yup from "yup";

export const forgotPasswordSchema = Yup.object().shape({
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
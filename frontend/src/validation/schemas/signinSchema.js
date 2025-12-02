import * as Yup from "yup";

export const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required"),
});
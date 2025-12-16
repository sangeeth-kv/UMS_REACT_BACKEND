import * as yup from "yup";

const profileDetailsSchema = yup.object({
  gender: yup
    .string()
    .oneOf(["male", "female", "other"], "Must select gender")
    .required("Gender is required"),

  dateOfBirth: yup
  .date()
  .typeError("Date of birth is required")
  .required("Date of birth is required")
  .min(new Date(1920, 0, 1), "Year must be 1920 or later")
  .max(new Date(), "Date of birth cannot be in the future"),

  bloodGroup: yup
    .string()
    .typeError("Blood group is required")
    .oneOf(
      ["A+","A-","B+","B-","AB+","AB-","O+","O-"],
      "Invalid blood group"
    )
    .nullable(),

  address: yup.object({
    place: yup
      .string()
      .trim()
      .min(2, "Place must be at least 2 characters")
      .required("Place is required"),

    city: yup
      .string()
      .trim()
      .min(2, "City must be at least 2 characters")
      .required("City is required"),

    state: yup
      .string()
      .trim()
      .min(2, "State must be at least 2 characters")
      .required("State is required"),

    pincode: yup
      .string()
      .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
      .required("Pincode is required"),
  }),
});

export default profileDetailsSchema;

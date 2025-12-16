const { body } = require("express-validator");

const ProfileDetailsValidator = [

  body("gender")
    .notEmpty().withMessage("Gender is required")
    .isIn(["male", "female", "other"])
    .withMessage("Invalid gender"),

  body("dateOfBirth")
    .notEmpty().withMessage("Date of birth is required")
    .isISO8601().withMessage("Invalid date format")
    .custom((value) => {
      const dob = new Date(value);
      const minDate = new Date("1920-01-01");
      const today = new Date();

      if (dob < minDate) {
        throw new Error("Year must be 1920 or later");
      }
      if (dob > today) {
        throw new Error("Date of birth cannot be in the future");
      }
      return true;
    }),

  body("bloodGroup")
    .notEmpty().withMessage("Blood group is required")
    .isIn(["A+","A-","B+","B-","AB+","AB-","O+","O-"])
    .withMessage("Invalid blood group"),

  // Address
  body("address.place")
    .notEmpty().withMessage("Place is required"),

  body("address.city")
    .notEmpty().withMessage("City is required"),

  body("address.state")
    .notEmpty().withMessage("State is required"),

  body("address.pincode")
    .notEmpty().withMessage("Pincode is required")
    .isLength({ min: 6, max: 6 })
    .withMessage("Pincode must be 6 digits")
    .isNumeric()
    .withMessage("Pincode must contain only numbers"),
];

module.exports = ProfileDetailsValidator;

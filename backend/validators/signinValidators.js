
const {body,validationResult}=require("express-validator")
const signinValidators=[
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Enter a valid email"),
    body("password")
        .notEmpty().withMessage("Password is required")
]

module.exports=signinValidators
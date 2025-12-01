const {body,validationResult}=require("express-validator")

const SignupValidator=[
    body("fullname")
    .notEmpty().withMessage("Fullname is required")
    .isLength({min:3}).withMessage("Fullname must be atleast 3 characters"),

    body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Enter a valid email"),

    body("phone")
    .notEmpty().withMessage("Phone number is required")
    .isMobilePhone("en-IN").withMessage("Enter a valid phone number"),

    body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be 6 characters long"),

    body("confirmPassword")
    .notEmpty().withMessage("Confirm Password is required")
    .custom((value,{req})=>{
        if (value !== req.body.password){
           throw new Error("Passwords do not match")
        }
        return true;
    })
]

module.exports=SignupValidator
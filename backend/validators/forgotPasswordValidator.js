const {body,validationResult}=require("express-validator")

const forgotPasswordValidator=[
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

module.exports=forgotPasswordValidator

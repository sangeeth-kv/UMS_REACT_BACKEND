const {Schema,model} =require("mongoose");

const userProfileSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true,
        index:true
    },
    gender: { type: String, enum: ["male", "female", "other"] },

    dateOfBirth: { type: Date },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    },

    address: {
      place: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: String }
    },

    isProfileCompleted:{
      type:Boolean,
      default:false
    }


},{ timestamps: true })

module.exports = model("UserProfile", userProfileSchema);
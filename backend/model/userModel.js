const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullname: { type: String, required: true },
    phone: { type: String, required: true, unique: true,index: true  },
    email: { type: String, required: true, unique: true,index:true },
    password: { type: String, required: true },

    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },

    refreshToken: { type: String },

    isVerified: {
      type: String,
      enum: ["not_verified", "requested", "verified"],
      default: "not_verified"
    }
,

    role: { 
      type: String, 
      enum: ["user", "admin", "superadmin"], 
      default: "user" 
    },

    avatar: { type: String },

    thumbnail:{type:String},

    avatarThumbStatus: {
      type: String,
      enum: ["pending", "processing", "ready", "failed"],
      default: "pending"
    }


  },
  { timestamps: true }
);

module.exports = model("User", userSchema);

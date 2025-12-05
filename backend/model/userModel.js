const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullname: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },

    refreshToken: { type: String },

    isVerified: { type: Boolean, default: false },

    role: { 
      type: String, 
      enum: ["user", "admin", "superadmin"], 
      default: "user" 
    }
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);

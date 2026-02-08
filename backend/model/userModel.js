const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullname: { type: String, required: true },
    phone: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },

    // isBlocked: { type: Boolean, default: false },
    isBlocked: {
      userIsBlocked: { type: Boolean, default: false },
      reason: { type: String, default: null },
      blockedBy: {
        id: { type: Schema.Types.ObjectId, ref: "Admin", default: null }
      }
    },

    isDeleted: {
      userIsDeleted: { type: Boolean, default: false },
      reason: { type: String, default: null },
      deletedBy: {
        id: { type: Schema.Types.ObjectId, default: null },
        role: { type: String, enum: ["admin", "superadmin", "user"] }
      }
    },

    isVerified: {
      type: String,
      enum: ["not_verified", "requested", "verified"],
      default: "not_verified"
    },

    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user"
    },

    avatar: {
      url: { type: String ,default:null},
      publicId: { type: String ,default:null},
      thumbnailUrl: { type: String ,default:null},
      thumbnailPublicId: { type: String ,default:null}
    },

    avatarThumbStatus: {
      type: String,
      enum: ["pending", "processing", "ready", "failed"],
      default: "pending"
    },

    avatarDeletePending: {
      type: Boolean,
      default: false
    },

    thumbnailAvatarPending: {
      type: Boolean,
      default: false
    },

    resetPassword: {
      tokenHash: String,
      expiresAt: {
      type: Date,
        index: { expires: "15m" }
      }
    },
    


  },
  { timestamps: true }
);


module.exports = model("User", userSchema);

const {Schema,model} =require("mongoose")

const adminSchema=new Schema(
    {
        name:{type:String},
        email: { type: String, unique: true, index: true },
        password:{type:String},

        role:{
            type:String,
            enum:["admin","user"],
            default:"admin"
        },

        permissions: [String],

        isActive: { type: Boolean, default: true },

        isBlocked: { type: Boolean, default: false },

        lastLoginAt: {type:Date},

        lastLogoutAt:{type:Date},

        passwordChangedAt:{type:Date},

        deletedAt:{type:Date},

        isDeleted: { type: Boolean, default: false },

    },{timestamps: true}
)

module.exports=model("Admin",adminSchema)
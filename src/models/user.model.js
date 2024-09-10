const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    }
})

module.exports = UserModel = mongoose.model("User",UserSchema)
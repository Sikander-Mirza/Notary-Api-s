const mongoose = require("mongoose")

const ConnectDB = async ()=>{
    try{
        mongoose.connect("mongodb://localhost:27017")
        console.log("DB Connected")
    }
    catch(err){
        console.log("Cannot Connected",err)
    }
}

module.exports = {ConnectDB}
const {CreateUser, DeleteUser, UpdateUser} = require("../controllers/userController.js")

const UserRoutes =(route)=>{

route.post("/user",CreateUser)
route.delete("/user/:id",DeleteUser)
route.put("/user/:id",UpdateUser)
}

module.exports = UserRoutes
const UserModel = require("../models/user.model.js");

const CreateUser = async (req, res) => {
  try {
    const data = await UserModel.create(req.body);
    console.log("User created");
    res.status(200).json(data); // Ensure status is set before sending the response
  } catch (err) {
    console.log("Cannot create user", err);
    res.status(500).json({ error: "Failed to create user" }); // Send an error response to the client
  }
};


const DeleteUser = async(req,res)=>{
try{
  const id = req.params.id;
  const data= await UserModel.deleteOne({ _id: id})
  console.log("User deleted");
    res.status(200).json(data);
}
catch (err) {
  console.log("Cannot delete user", err);
  res.status(500).json({ error: "Failed to delete user" });
}
}

const UpdateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body; // Data to update the user with
    const data = await UserModel.findByIdAndUpdate({ _id: id }, updateData, { new: true });

    if (data.nModified === 0) {
      // Handle case where no user was updated (i.e., user not found or no change)
      return res.status(404).json({ error: "User not found or no changes made" });
    }

    console.log("User updated");
    res.status(200).json({ message: "User successfully updated", data });
  } catch (err) {
    console.log("Cannot update user", err);
    res.status(500).json({ error: "Failed to update user" });
  }
};


module.exports = { CreateUser , DeleteUser , UpdateUser };

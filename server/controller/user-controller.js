import User from "../model/Schema.js";
import bcrypt from "bcrypt";

export const signupUser = async (request, response) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(request.body.password, salt);
    const user = {
      username: request.body.username,
      name: request.body.name,
      password: hashedPassword,
    };
    const newUser = new User(user);

    await newUser.save();
    console.log("Save new user to database success");
    response.status(200).json({ msg: "Sign Up Succesfull" });
  } catch (error) {
    response.status(500).json({ msg: "Error while Sign Up the User" });
  }
};
export const loginUser = async (request, response) => {
  let user = await User.findOne({ username: request.body.username });
  if (!user) {
    response.status(400).json({ msg: "User Doesn't Exist" });
  }
  try {
    let match = await bcrypt.compare(request.body.password, user.password);
    if (match) {
    } else {
      response.status(400).json({ msg: "Possword doesn't match" });
    }
  } catch (error) {}
};

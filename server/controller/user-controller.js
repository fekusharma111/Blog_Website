import User from "../model/Schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Token from "../model/token.js";
import dotenv from "dotenv";

dotenv.config();
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
  // database ke collection "User " me find kro username ke field me , jo request aa rhi hai uske username se
  let user = await User.findOne({ username: request.body.username });
  //if username didnt match send the error response

  if (!user) {
    return response.status(400).json({ msg: "User Doesn't Exist" });
  }
  // but if user match then run that try and catch
  try {
    //match= compare the requested password with user's actual password that stored in database.
    let match = await bcrypt.compare(request.body.password, user.password);
    // if match success
    if (match) {
      // create access token that will expire with in 15 min and recall after 15 min with the help of refresh token
      //accesstoken= jwt.sign(convert requested user details intojson, and bind them or replace with new random value, {expire time})
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );
      //refresh Token ko database me save kara liya because access token expire hone ke bad refresh token ki help se fir se access token milega
      //refresh token ko verify kara ke tokenschema se fir database me save kara lo
      const newToken = new Token({ token: refreshToken });
      await newToken.save();
      // response send in json format with accessToken,refreshtoken, nameof user and username of user
      response.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: user.name,
        username: user.username,
      });
    }
    // if match fails
    else {
      response.status(400).json({ msg: "Possword doesn't match" });
    }
  } catch (error) {
    response.status(400).json({ msg: "Error while login in user" });
  }
};

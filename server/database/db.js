import mongoose from "mongoose";

const connection = async (dbUsername, dbPassword) => {
  const URL = `mongodb://localhost:27017/blogwebsite`;
  try {
    await mongoose.connect(URL, { usenewUrlParser: true });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Error while connecting to database", error);
  }
};
export default connection;

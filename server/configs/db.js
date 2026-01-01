import mongoose from "mongoose";
let connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("DataBase Connected")
    );
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log(error.message);
  }
};
export default connectDB;

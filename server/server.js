// Import necessary modules and configurations
import express from "express";
import connectDB from "./configs/db.js";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/user.Routes.js";
// MiddleWares
const app = express();
app.use(express.json());
app.use(cors());
// Routes
app.use("/api/auth", authRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});

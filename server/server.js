// Import necessary modules and configurations
import dns from "node:dns/promises";
import express from "express";
import connectDB from "./configs/db.js";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/user.Routes.js";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
// MiddleWares
const app = express();
app.use(express.json());
app.use(cors());
// Routes
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => res.send("Api working "));

connectDB().then(() => {
  app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});

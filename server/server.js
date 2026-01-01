// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// import "dotenv/config";
// import connectDB from "./config/db.js";
// import authRouter from "./routes/authRoutes.js";
// import userRouter from "./routes/userRoutes.js";

// const app = express();
// const PORT = process.env.PORT || 5000;
// connectDB();
// const allowedOrigins = "http://localhost:5173";
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:5173", // your React app
//     credentials: true, // allow cookies to be sent
//   })
// );
// // API Endpoints

// app.get("/", (req, res) => {
//   res.send("Api working");
// });
// app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);
// app.listen(PORT, () => console.log("Server is Running on PORT:", PORT));

import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";
import "dotenv/config";

import passportSetup from "./configs/passport.js";
import connectDB from "./configs/db.js";
import userRoutes from "./routes/userRoutes.js";
import passport from "passport";
const app = express();

passportSetup();

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_session_secret_fallback",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
  })
);
app.use("/auth", userRoutes);
connectDB().then(() =>
  app.listen(5000, () =>
    console.log(`Server Connected running on port ${5000} `)
  )
);

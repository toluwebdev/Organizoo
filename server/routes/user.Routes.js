import express from "express";
import { Auth }  from "../middleware/userAuth.js" 
import { SignUp, Login, VerifyEmail, ResendEmailOtp,ResendPasswordOtp, CheckResetPasswordOtp, ResetPassword} from "../controllers/user.Controllers.js";
const router = express.Router();
router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/verifyEmail", Auth, VerifyEmail);
router.post("/sendEmailOtp", Auth, ResendEmailOtp);
router.post("/sendPasswordResetOtp", ResendPasswordOtp);
router.post("/sendPasswordResetOtp", CheckResetPasswordOtp);
router.post("/resetPassword", ResetPassword);
// router.post("/editProfile")
export default router;

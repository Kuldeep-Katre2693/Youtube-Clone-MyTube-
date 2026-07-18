import express from "express";
import {
  login,
  updateprofile,
  getUserById,
  updateTheme,
  verifyOTP,
  resendOTP,
} from "../controllers/auth.js";

const routes = express.Router();

routes.post("/login", login);
routes.patch("/update/:id", updateprofile);
routes.patch("/theme/:id", updateTheme);
routes.get("/:id", getUserById);
routes.post("/verify-otp", verifyOTP);
routes.post("/resend-otp", resendOTP);
export default routes;

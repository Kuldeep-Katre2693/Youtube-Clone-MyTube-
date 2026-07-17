import express from "express";
import {
  login,
  updateprofile,
  getUserById,
  updateTheme,
  verifyOTP,
} from "../controllers/auth.js";

const routes = express.Router();

routes.post("/login", login);
routes.patch("/update/:id", updateprofile);
routes.patch("/theme/:id", updateTheme);
routes.get("/:id", getUserById);
routes.post("/verify-otp", verifyOTP);
export default routes;

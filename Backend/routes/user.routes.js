import express from "express";
import {login,logout,register,updateProfile} from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();
router.route ("/login").post(login);
router.route ("/register").post(register);
router.route ("/logout").get(logout);
router.route ("/updateprofile").post(isAuthenticated,updateProfile);


export default router;

import express from "express";
import {login,register,updateProfile} from "../contollers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();
router.route ("/login").post(login);
router.route ("/register").post(register);
router.route ("/updateprofile").post(isAuthenticated,updateProfile);


export default router;

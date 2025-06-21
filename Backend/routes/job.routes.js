import express from "express";
import {login,logout,register,updateProfile} from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getAllJobs, getAminJobs, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();
router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(isAuthenticated,getAllJobs);
router.route("/getadminjobs").get(isAuthenticated,getAminJobs);
router.route("/get/:id").get(isAuthenticated,getJobById);


export default router;

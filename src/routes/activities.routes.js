import express from "express";
import ActivityController from "../controllers/activity.controller.js";

const activityRouter = express.Router();

activityRouter.get("/", ActivityController.getAllActivities);
activityRouter.post("/", ActivityController.createActivity)

export default activityRouter;

import express from "express";
import ActivityController from "../controllers/activity.controller.js";

const activityRouter = express.Router();

activityRouter.get("/", ActivityController.getAllActivities);
activityRouter.post("/", ActivityController.createActivity)
activityRouter.put("/:id", ActivityController.updateActivity);
activityRouter.get("/:id", ActivityController.getActivityById);
activityRouter.delete("/:id", ActivityController.deleteActivity);

export default activityRouter;

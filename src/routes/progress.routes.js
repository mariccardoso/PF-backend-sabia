import express from "express";
import ProgressController from "../controllers/progress.controller.js";

const progressRouter = express.Router();

progressRouter.get("/", ProgressController.getAllProgress);
progressRouter.post("/", ProgressController.createProgress);
progressRouter.put("/:id", ProgressController.updateProgress);
progressRouter.delete("/:id", ProgressController.deleteProgress);

export default progressRouter;

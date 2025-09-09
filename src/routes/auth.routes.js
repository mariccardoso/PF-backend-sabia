import express from "express";
import AuthController from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.get("/users", AuthController.getAllUsers);
authRouter.get("/profile/:id", AuthController.getProfile);
authRouter.delete("/users/:id", AuthController.deleteUser);

export default authRouter;

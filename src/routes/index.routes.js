import express from "express";

// Importar todas as rotas
import authRouter from "./auth.routes.js";
import authMiddleware from "../middleware/auth.middleware.js";
import activityRouter from "./activities.routes.js";
import gameRouter from "./game.routes.js";
import channelRouter from "./channels.routes.js";
import progressRouter from "./progress.routes.js";

const router = express.Router();

// Rotas públicas
router.use("/auth", authRouter);
router.use("/games", gameRouter)
router.use ("/channels", channelRouter)

// Rotas protegidas
router.use(authMiddleware);
router.use("/activities", activityRouter);
router.use("/progress", progressRouter);



export default router;

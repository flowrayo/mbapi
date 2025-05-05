import { Router } from "express";
import { adConfig, appVersion } from "../controllers/config";

const router = Router();

router.get("/ad-config", adConfig);
router.get("/app-version", appVersion);

export default router; 
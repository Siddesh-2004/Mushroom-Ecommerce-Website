import {Router} from "express";
import { loginAdmin, logoutAdmin } from "../controllers/admin.controller.js";
const router = Router();

router.route("/login").post(loginAdmin);
router.route("/logout").post(logoutAdmin);

export default router;
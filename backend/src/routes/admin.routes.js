import {Router} from "express";
import { loginAdmin, logoutAdmin, verifyJwtAdmin } from "../controllers/admin.controller.js";
const router = Router();

router.route("/login").post(loginAdmin);
router.route("/logout").post(logoutAdmin);
router.route('/verify').post(verifyJwtAdmin)
export default router;
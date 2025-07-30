import Router from "express"
import {upload} from "../middlewares/multer.js"
import { addBanner,deleteBanner } from "../controllers/banner.controller.js";
const router=Router();
router.route('/add')
    .post(upload.single('picture'), addBanner);
router.route('/delete/:id')
    .delete(deleteBanner);
export default router;
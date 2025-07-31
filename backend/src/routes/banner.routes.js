import Router from "express"
import {upload} from "../middlewares/multer.js"
import { addBanner,deleteBanner ,viewBanners} from "../controllers/banner.controller.js";
const router=Router();
router.route('/add')
    .post(upload.single('picture'), addBanner);
router.route('/delete/:id')
    .delete(deleteBanner);
router.route('/view')
    .get(viewBanners)
export default router;
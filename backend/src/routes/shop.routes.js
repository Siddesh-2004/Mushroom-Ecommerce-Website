import Router from "express"
import {upload} from "../middlewares/multer.js"
import { addShop } from "../controllers/shop.controller.js";
const router=Router();

router.route('/add')
    .post(upload.single('picture'),addShop)

export default router;
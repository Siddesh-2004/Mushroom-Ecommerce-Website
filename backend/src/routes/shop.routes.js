import Router from "express"
import {upload} from "../middlewares/multer.js"
import { addShop,deleteShop, updateShop, viewAllShops } from "../controllers/shop.controller.js";
const router=Router();

router.route('/add')
    .post(upload.single('picture'),addShop);
router.route('/delete/:id')
    .delete(deleteShop);
router.route('/update/:id')
    .put(upload.single('picture'),updateShop);
router.route('/view')
    .get(viewAllShops);

export default router;
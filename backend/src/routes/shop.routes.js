import Router from "express"
import {upload} from "../middlewares/multer.js"
import { addShop,deleteShop, updateShop, updateShopImage, viewAllShops, viewSingleShop } from "../controllers/shop.controller.js";
const router=Router();

router.route('/add')
    .post(upload.single('picture'),addShop);
router.route('/delete/:id')
    .delete(deleteShop);
router.route('/update/:id')
    .patch(upload.single('picture'),updateShop);
router.route('/view')
    .get(viewAllShops);
router.route('/viewProduct/:id')
    .get(viewSingleShop);
router.route('/update/image/:id')
    .post(upload.single('picture'),updateShopImage);

export default router;
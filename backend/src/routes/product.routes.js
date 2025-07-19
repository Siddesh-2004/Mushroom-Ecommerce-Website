import Router from 'express';
import { addProduct ,deleteProduct,updateProduct,viewAllProduct} from '../controllers/product.controller.js';
import { upload } from '../middlewares/multer.js';


const router = Router();

router.route('/add')
    .post(upload.single('picture'), addProduct);

router.route('/delete/:id')
    .delete(deleteProduct);
router.route('/update/:id')
    .put(upload.single('picture'), updateProduct);
router.route('/view')
    .get(viewAllProduct);

export default router;
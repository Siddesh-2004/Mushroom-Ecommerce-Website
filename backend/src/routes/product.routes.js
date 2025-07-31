import Router from 'express';
import { addProduct ,deleteProduct,updateProduct,updateProductImage,viewAllProduct,viewSingleProduct} from '../controllers/product.controller.js';
import { upload } from '../middlewares/multer.js';


const router = Router();

router.route('/add')
    .post(upload.single('picture'), addProduct);

router.route('/delete/:id')
    .delete(deleteProduct);
router.route('/update/:id')
    .patch(upload.single('picture'), updateProduct);
router.route('/view')
    .get(viewAllProduct);
router.route('/viewProduct/:id')
    .get(viewSingleProduct);
router.route('/image/update/:id')
    .patch(upload.single('picture'),updateProductImage);

export default router;
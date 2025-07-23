import Router from 'express';
import { addLocation, deleteLocation, viewLocations } from '../controllers/location.controller.js';
const router = Router();


router.route('/view')
    .get(viewLocations);
router.route('/add')
    .post(addLocation);
router.route('/delete/:id')
    .delete(deleteLocation);
export default router;
import Router from "express"
import getDashBoardData from "../controllers/dashboard.controller.js"
const router=Router()
router.route('/details')
    .get(getDashBoardData);
export default router;
import Router from "express";
import {addOrder,viewOrder,viewCustomerOrder,updateOrderStatus} from "../controllers/order.controller.js";

const router = Router();

router.route("/add")
    .post(addOrder);
router.route("/view")
    .get(viewOrder);
router.route("/view/customerOrder")
    .post(viewCustomerOrder);
router.route("/update/orderStatus")
    .patch(updateOrderStatus);

export default router;

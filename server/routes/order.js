const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("user"), allOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("user"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("user"), deleteOrder);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

//USER RIGHTS

router.route("/products").get(isAuthenticatedUser, getProducts);

router.route("/product/:id").get(getSingleProduct);

//ADMIN RIGHTS

router.route("/admin/product/new").post(authorizeRoles("admin"), newProduct);

// router.route("/admin/product/:id").put(authorizeRoles("admin"), updateProduct);

router
  .route("/admin/product/:id")
  .put(authorizeRoles("admin"), updateProduct)
  .delete(authorizeRoles("admin"), deleteProduct);

// router.route("/review").put(isAuthenticatedUser, createProductReview);

module.exports = router;

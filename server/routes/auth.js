const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateProfile,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} = require("../controllers/authController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticatedUser, getUserProfile);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("user"), allUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("user"), getUserDetails)
  .put(isAuthenticatedUser, authorizeRoles("user"), updateUser)
  .delete(isAuthenticatedUser, authorizeRoles("user"), deleteUser);

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

module.exports = router;

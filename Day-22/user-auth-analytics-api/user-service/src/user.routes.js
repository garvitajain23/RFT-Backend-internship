const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");
const {
  createProfile,
  getMyProfile,
  getAllProfiles,
  updateProfile,
  deleteProfile,
} = require("./user.controller");

router.post("/", verifyToken, createProfile);
router.get("/me", verifyToken, getMyProfile);
router.get("/", verifyToken, getAllProfiles);
router.put("/", verifyToken, updateProfile);
router.delete("/", verifyToken, deleteProfile);
router.delete("/:userId", verifyToken, deleteProfile);

module.exports = router;
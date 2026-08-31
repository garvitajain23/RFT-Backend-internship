const express = require("express");
const router = express.Router();
const planController = require("../controllers/plan.controller");
const { verifyToken, isAdmin } = require("../../../shared/middlewares/verifyToken");

router.get("/", planController.getAllPlans);
router.get("/:id", planController.getPlanById);
router.post("/", verifyToken, isAdmin, planController.createPlan);
router.put("/:id", verifyToken, isAdmin, planController.updatePlan);
router.delete("/:id", verifyToken, isAdmin, planController.deletePlan);

module.exports = router;
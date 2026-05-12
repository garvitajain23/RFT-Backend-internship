const express = require("express");
const router = express.Router();
const controller = require("../controller/task.controller");

router.get("/", controller.getTasks); // GET  /tasks
router.get("/:id", controller.getTask); // GET  /tasks/:id
router.post("/", controller.createTask); // POST /tasks
router.patch("/:id/complete", controller.completeTask); // PATCH /tasks/:id/complete  ← BONUS partial update
router.delete("/:id", controller.removeTask); // DELETE /tasks/:id

module.exports = router;

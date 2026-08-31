const express = require("express");
const router = express.Router();
const axios = require("axios");

// Forward all /api/tasks/* to task-service with auth header
const forward = (method, path) => async (req, res) => {
  try {
    const { data } = await axios({
      method,
      url: `${process.env.TASK_SERVICE_URL}/api/tasks${path ? "/" + req.params.id : ""}`,
      data: req.body,
      headers: { Authorization: req.headers.authorization },
      params: req.query,
    });
    res.json(data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { message: "Task service error" });
  }
};

router.get("/",        forward("get",    ""));
router.get("/all",     forward("get",    "all"));
router.get("/:id",     forward("get",    ":id"));
router.post("/",       forward("post",   ""));
router.put("/:id",     forward("put",    ":id"));
router.delete("/:id",  forward("delete", ":id"));

module.exports = router;
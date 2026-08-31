const express = require("express");
const router = express.Router();
const axios = require("axios");

const forward = (method, url) => async (req, res) => {
  try {
    const { data } = await axios({
      method,
      url: `${process.env.USER_SERVICE_URL}/api/users${url}`,
      data: req.body,
      headers: { Authorization: req.headers.authorization },
    });
    res.json(data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { message: "User service error" });
  }
};

router.get("/",         forward("get",  "/"));
router.get("/profile",  forward("get",  "/profile"));
router.put("/profile",  forward("put",  "/profile"));

module.exports = router;
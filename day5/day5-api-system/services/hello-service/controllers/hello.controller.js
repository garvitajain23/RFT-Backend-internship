const helloService = require("../services/hello.service");

const sayHello = (req, res) => {
  // 🔒 Verify request came from gateway, not directly
  const secret = req.headers["x-internal-secret"];
  if (secret !== process.env.INTERNAL_SECRET) {
    return res
      .status(403)
      .json({ success: false, error: "Access denied. Use the gateway." });
  }

  const { name } = req.query;
  console.log(`[Hello Controller] Request received | name=${name || "none"}`);

  try {
    const result = helloService.getGreeting(name);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(`[Hello Controller] Error: ${error.message}`);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = { sayHello };

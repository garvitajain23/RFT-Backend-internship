const calcService = require("../services/calc.service");

const performCalculation = (req, res) => {
  const secret = req.headers["x-internal-secret"];
  if (secret !== process.env.INTERNAL_SECRET) {
    return res
      .status(403)
      .json({ success: false, error: "Access denied. Use the gateway." });
  }

  const { num1, num2, operation } = req.query;
  console.log(`[Calc Controller] ${num1} ${operation} ${num2}`);

  try {
    const result = calcService.calculate(num1, num2, operation);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(`[Calc Controller] Error: ${error.message}`);
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = { performCalculation };

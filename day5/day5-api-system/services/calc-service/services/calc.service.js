const calculate = (num1, num2, operation) => {
  const a = parseFloat(num1);
  const b = parseFloat(num2);

  if (isNaN(a) || isNaN(b))
    throw new Error("num1 and num2 must be valid numbers");

  let result;
  switch (operation) {
    case "add":
      result = a + b;
      break;
    case "subtract":
      result = a - b;
      break;
    case "multiply":
      result = a * b;
      break;
    case "divide":
      if (b === 0) throw new Error("Cannot divide by zero");
      result = a / b;
      break;
    default:
      throw new Error(
        "Invalid operation. Use: add, subtract, multiply, divide",
      );
  }

  return { num1: a, num2: b, operation, result };
};

module.exports = { calculate };

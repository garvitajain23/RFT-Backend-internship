const { validateUser } = require("../services/userService");

const submitUser = (req, res) => {
  const { name, email, age } = req.body;

  // Defensive: check all fields are at least present in the request
  if (name === undefined || email === undefined || age === undefined) {
    return res.status(400).json({
      success: false,
      errors: ["Request body must include name, email, and age"],
    });
  }

  const errors = validateUser({ name, email, age });

  if (errors.length > 0) {
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors, // ✅ ALL errors returned at once (Bonus)
    });
  }

  return res.status(200).json({
    success: true,
    message: "User form submitted successfully ✅",
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      age: Number(age),
    },
  });
};

module.exports = { submitUser };

// Checks that all required fields are present in the request body
const validateStudent = (req, res) => {
  const { studentId, name, email, course, age } = req.body;
  const missingFields = [];

  if (!studentId) missingFields.push("studentId");
  if (!name) missingFields.push("name");
  if (!email) missingFields.push("email");
  if (!course) missingFields.push("course");
  if (!age) missingFields.push("age");

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  res.status(200).json({
    success: true,
    message: "All fields are present",
  });
};

module.exports = { validateStudent };

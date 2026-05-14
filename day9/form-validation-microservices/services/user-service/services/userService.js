// ── Individual field validators ───────────────────────────────────────────────

const validateName = (name) => {
  const errors = [];

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    errors.push("Name is required and cannot be empty");
    return errors; // no point checking further
  }

  if (name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  if (name.trim().length > 50) {
    errors.push("Name cannot exceed 50 characters");
  }

  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(name.trim())) {
    errors.push(
      "Name can only contain letters, spaces, hyphens, or apostrophes",
    );
  }

  return errors;
};

const validateEmail = (email) => {
  const errors = [];

  if (!email || typeof email !== "string" || email.trim().length === 0) {
    errors.push("Email is required and cannot be empty");
    return errors;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    errors.push("Email must be a valid format (e.g. user@example.com)");
  }

  return errors;
};

const validateAge = (age) => {
  const errors = [];

  if (age === undefined || age === null || age === "") {
    errors.push("Age is required");
    return errors;
  }

  const parsed = Number(age);

  if (isNaN(parsed)) {
    errors.push("Age must be a number");
  } else if (!Number.isInteger(parsed)) {
    errors.push("Age must be a whole number");
  } else if (parsed < 5) {
    errors.push("Age must be at least 5");
  } else if (parsed > 100) {
    errors.push("Age cannot exceed 100");
  }

  return errors;
};

// ── Main validator: runs all three, collects ALL errors at once ───────────────
const validateUser = ({ name, email, age }) => {
  const errors = [
    ...validateName(name),
    ...validateEmail(email),
    ...validateAge(age),
  ];

  return errors;
};

module.exports = { validateUser };

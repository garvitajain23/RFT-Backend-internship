const getGreeting = (name) => {
  const displayName = name ? name : "Stranger";
  return {
    message: `Hello, ${displayName}! 👋 Welcome to the API system.`,
    timestamp: new Date().toISOString(),
    service: "Hello Service",
  };
};

module.exports = { getGreeting };

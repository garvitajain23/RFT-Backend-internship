const { createLogger, format, transports } = require("winston");

const createServiceLogger = (serviceName) => {
  return createLogger({
    level: "debug",
    defaultMeta: { service: serviceName },
    format: format.combine(
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      format.printf(({ level, message, timestamp, service }) =>
        `[${timestamp}] [${service}] ${level.toUpperCase()}: ${message}`
      )
    ),
    transports: [new transports.Console()],
  });
};

module.exports = createServiceLogger;
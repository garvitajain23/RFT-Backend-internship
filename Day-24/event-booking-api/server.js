require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const errorHandler = require("./errorHandler");

const eventRoutes = require("./services/event-service/event.routes");
const bookingRoutes = require("./services/booking-service/booking.routes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => res.send("Event Booking API is running"));

app.post("/api/notify/test-qr", require("./services/notification-service/notification.controller").testQR);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
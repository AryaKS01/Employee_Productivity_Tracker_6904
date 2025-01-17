const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const insightsRoutes = require("./routes/insightsRoutes");
const gamificationRoutes = require("./routes/gamificationRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use("/notifications", notificationRoutes);
app.use("/insights", insightsRoutes);
app.use("/tasks", taskRoutes);
app.use("/gamification", gamificationRoutes); // New route for gamification

mongoose
  .connect("mongodb://localhost:27017/employee-productivity-tracker")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true }, // e.g., Developer, Manager
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

module.exports = mongoose.model("Employee", employeeSchema);

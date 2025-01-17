const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  timeSpent: { type: Number, required: true },
  priorityLevel: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
  },
  category: {
    type: String,
    enum: ["BAU", "Ad Hoc", "Project-Based"],
    required: true,
  },
  reference: { type: String },
  supportingDocuments: { type: [String] },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" }, // Link to Employee (future expansion)
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", taskSchema);

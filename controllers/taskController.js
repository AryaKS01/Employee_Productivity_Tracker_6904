const Task = require("../models/Task");

// Add a new task
exports.addTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: "Error adding task", error });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Get a specific task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: "Error updating task", error });
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

// Dashboard Insights
exports.getDashboardData = async (req, res) => {
  try {
    const tasks = await Task.find();
    const productivityData = {
      totalTasks: tasks.length,
      categoryBreakdown: {
        BAU: tasks.filter((task) => task.category === "BAU").length,
        AdHoc: tasks.filter((task) => task.category === "Ad Hoc").length,
        ProjectBased: tasks.filter((task) => task.category === "Project-Based")
          .length,
      },
      priorityBreakdown: {
        Low: tasks.filter((task) => task.priorityLevel === "Low").length,
        Medium: tasks.filter((task) => task.priorityLevel === "Medium").length,
        High: tasks.filter((task) => task.priorityLevel === "High").length,
      },
      efficiencyScores: await calculateEfficiencyScore(tasks), // AI-powered efficiency scores
    };
    res.status(200).json(productivityData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard data", error });
  }
};

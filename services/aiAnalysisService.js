const sentiment = require("sentiment"); // Example sentiment analysis library
const Task = require("../models/Task");
const Employee = require("../models/Employee");

// Calculate task efficiency score
const calculateEfficiencyScore = async (tasks) => {
  return tasks.map((task) => {
    const timeRatio = task.estimatedTime
      ? task.timeSpent / task.estimatedTime
      : 1;
    const priorityWeight =
      task.priorityLevel === "High"
        ? 1.5
        : task.priorityLevel === "Medium"
        ? 1.2
        : 1;
    return {
      taskId: task._id,
      efficiencyScore: (1 / timeRatio) * priorityWeight,
    };
  });
};

// Analyze ad hoc task impact
const analyzeAdHocImpact = async (tasks) => {
  return tasks
    .filter((task) => task.category === "Ad Hoc")
    .map((task) => ({
      taskId: task._id,
      impact: task.dependencies ? task.dependencies.length * 2 : 1,
    }));
};

// Predict employee performance trends
const predictPerformance = async (employeeId) => {
  const tasks = await Task.find({ employeeId }).sort({ createdAt: -1 });
  const recentEfficiency =
    tasks.slice(0, 5).reduce((acc, task) => acc + task.efficiencyScore, 0) / 5;

  return recentEfficiency > 0.8
    ? "Improving"
    : recentEfficiency < 0.5
    ? "Declining"
    : "Stable";
};

// Perform sentiment monitoring
const monitorSentiment = async (taskDescriptions) => {
  return taskDescriptions.map((description) => {
    const analysis = new sentiment();
    return {
      description,
      sentimentScore: analysis.analyze(description).score,
    };
  });
};

module.exports = {
  calculateEfficiencyScore,
  analyzeAdHocImpact,
  predictPerformance,
  monitorSentiment,
};

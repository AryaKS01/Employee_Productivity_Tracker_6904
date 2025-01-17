const Task = require("../models/Task");
const Employee = require("../models/Employee");
const {
  calculateEfficiencyScore,
  analyzeAdHocImpact,
  predictPerformance,
  monitorSentiment,
} = require("../services/aiAnalysisService");

// Task efficiency scoring
exports.taskEfficiencyScoring = async (req, res) => {
  try {
    const tasks = await Task.find({});
    const scores = await calculateEfficiencyScore(tasks);
    res.status(200).json(scores);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error calculating task efficiency scores", error });
  }
};

// Ad hoc task impact analysis
exports.adHocImpactAnalysis = async (req, res) => {
  try {
    const tasks = await Task.find({});
    const impactAnalysis = await analyzeAdHocImpact(tasks);
    res.status(200).json(impactAnalysis);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error analyzing ad hoc task impact", error });
  }
};

// Performance prediction
exports.performancePrediction = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const prediction = await predictPerformance(employeeId);
    res.status(200).json({ employeeId, performanceTrend: prediction });
  } catch (error) {
    res.status(500).json({ message: "Error predicting performance", error });
  }
};

// Sentiment monitoring
exports.sentimentMonitoring = async (req, res) => {
  try {
    const tasks = await Task.find({});
    const sentiments = await monitorSentiment(
      tasks.map((task) => task.description)
    );
    res.status(200).json(sentiments);
  } catch (error) {
    res.status(500).json({ message: "Error monitoring sentiment", error });
  }
};

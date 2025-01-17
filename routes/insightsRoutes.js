const express = require("express");
const router = express.Router();
const insightsController = require("../controllers/insightsController");

// Task efficiency scoring
router.get("/efficiency", insightsController.taskEfficiencyScoring);

// Ad hoc task impact analysis
router.get("/ad-hoc-impact", insightsController.adHocImpactAnalysis);

// Performance prediction
router.get(
  "/performance/:employeeId",
  insightsController.performancePrediction
);

// Sentiment monitoring
router.get("/sentiment", insightsController.sentimentMonitoring);

module.exports = router;

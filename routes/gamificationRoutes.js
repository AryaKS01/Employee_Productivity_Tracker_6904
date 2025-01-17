const express = require("express");
const router = express.Router();
const gamificationController = require("../controllers/gamificationController");
const roleBasedAccessControl = require("../middleware/authMiddleware");

router.get(
  "/leaderboards",
  roleBasedAccessControl(["Employer"]),
  gamificationController.getLeaderboards
);

module.exports = router;

const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

// Send productivity alerts
router.post("/alerts", notificationController.sendProductivityAlerts);

// Send deadline reminders
router.post("/reminders", notificationController.sendDeadlineReminders);

// Get notifications for an employee
router.get("/:employeeId", notificationController.getNotifications);

// Mark notification as read
router.put("/:id/read", notificationController.markNotificationAsRead);

module.exports = router;

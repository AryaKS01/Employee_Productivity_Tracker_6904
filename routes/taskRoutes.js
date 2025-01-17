const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.post("/", taskController.addTask);
router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTaskById);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
router.get("/dashboard/insights", taskController.getDashboardData);

module.exports = router;

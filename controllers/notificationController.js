const Notification = require("../models/Notification");
const Task = require("../models/Task");

// Send productivity alerts
exports.sendProductivityAlerts = async (req, res) => {
  try {
    // Example logic: Fetch employees with low productivity
    const lowProductivityTasks = await Task.aggregate([
      { $group: { _id: "$employeeId", totalTime: { $sum: "$timeSpent" } } },
      { $match: { totalTime: { $lt: 120 } } }, // Example threshold: Less than 2 hours total
    ]);

    // Create notifications for low productivity
    const notifications = lowProductivityTasks.map((task) => ({
      employeeId: task._id,
      type: "Alert",
      message:
        "Your productivity is low this week. Consider focusing on completing more tasks.",
    }));

    await Notification.insertMany(notifications);
    res.status(200).json({ message: "Productivity alerts sent successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending productivity alerts", error });
  }
};

// Send deadline reminders
exports.sendDeadlineReminders = async (req, res) => {
  try {
    const currentDate = new Date();

    // Fetch tasks nearing or past their deadline
    const tasks = await Task.find({
      deadline: { $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) },
    });

    const reminders = tasks.map((task) => ({
      employeeId: task.employeeId,
      type: "Reminder",
      message: `Reminder: Task "${task.title}" is due soon or overdue. Please take action.`,
    }));

    await Notification.insertMany(reminders);
    res.status(200).json({ message: "Deadline reminders sent successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending deadline reminders", error });
  }
};

// Get notifications for an employee
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      employeeId: req.params.employeeId,
    }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error });
  }
};

// Mark a notification as read
exports.markNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!notification)
      return res.status(404).json({ message: "Notification not found" });
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: "Error updating notification", error });
  }
};

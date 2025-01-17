const Employee = require("../models/Employee");

exports.getLeaderboards = async (req, res) => {
  try {
    const employees = await Employee.find().populate("tasks");
    const leaderboards = employees
      .map((employee) => ({
        name: employee.name,
        completedTasks: employee.tasks.length, // Example metric for leaderboard
      }))
      .sort((a, b) => b.completedTasks - a.completedTasks);

    res.status(200).json(leaderboards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leaderboards", error });
  }
};

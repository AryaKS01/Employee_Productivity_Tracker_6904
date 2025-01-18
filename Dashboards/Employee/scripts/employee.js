document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    const completedTasksSection = document.createElement("div");
    completedTasksSection.id = "completedTasks";
    completedTasksSection.innerHTML = `<h2 class="text-xl font-semibold mt-8">Completed Tasks</h2><div id="completedTaskList" class="space-y-4"></div>`;
    taskList.parentElement.appendChild(completedTasksSection);
    const completedTaskList = document.getElementById("completedTaskList");
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const renderTasks = () => {
        taskList.innerHTML = ""; // Clear current tasks
        completedTaskList.innerHTML = ""; // Clear completed tasks

        savedTasks.forEach((task, index) => {
            const taskElement = document.createElement("div");
            taskElement.className = `p-4 rounded shadow-md space-y-2 ${
                task.completed ? "bg-green-100" : "bg-gray-100"
            }`;

            taskElement.innerHTML = `
                <h3 class="text-lg font-bold ${
                    task.completed ? "line-through text-gray-500" : ""
                }">${task.title}</h3>
                <p><strong>Description:</strong> ${task.description}</p>
                <p><strong>Category:</strong> ${task.category}</p>
                <p><strong>Priority:</strong> ${task.priority}</p>
                <p><strong>Time Spent:</strong> ${task.timeSpent} hours</p>
                <p><strong>Assigned By:</strong> ${task.reference}</p>
                <p><strong>Attachment:</strong> ${task.attachment || "None"}</p>
                <p><strong>Link:</strong> <a href="${task.link}" target="_blank">${
                task.link || "None"
            }</a></p>
                ${
                    task.completed
                        ? ""
                        : `<button class="bg-green-500 text-white px-4 py-2 rounded mark-complete" data-index="${index}">Mark Complete</button>`
                }
            `;

            if (task.completed) {
                completedTaskList.appendChild(taskElement);
            } else {
                taskList.appendChild(taskElement);
            }
        });

        // Add event listeners for marking tasks complete
        document.querySelectorAll(".mark-complete").forEach((button) =>
            button.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                savedTasks[index].completed = true;
                localStorage.setItem("tasks", JSON.stringify(savedTasks));
                renderTasks();
                updateProgressChart();
            })
        );
    };

    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const newTask = {
            title: document.getElementById("taskTitle").value,
            description: document.getElementById("taskDescription").value,
            timeSpent: document.getElementById("timeSpent").value,
            priority: document.getElementById("priority").value,
            category: document.getElementById("taskCategory").value,
            attachment: document.getElementById("taskAttachment").files[0]
                ? document.getElementById("taskAttachment").files[0].name
                : null,
            link: document.getElementById("taskLink").value,
            reference: document.getElementById("taskReference").value,
            completed: false,
            timestamp: new Date().toISOString(),
        };

        savedTasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        taskForm.reset();
        renderTasks();
        updateProgressChart();
    });

    const updateProgressChart = () => {
        const totalTasks = savedTasks.length;
        const completedTasks = savedTasks.filter((task) => task.completed).length;

        // Update the pie chart or any other visual indicator here
        console.log(`Total: ${totalTasks}, Completed: ${completedTasks}`);
        // For now, you can add a placeholder update or implement a library like Chart.js.
    };

    // Initial render
    renderTasks();
    updateProgressChart();
});

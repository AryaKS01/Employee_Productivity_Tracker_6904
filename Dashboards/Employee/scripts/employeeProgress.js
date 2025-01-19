document.addEventListener("DOMContentLoaded", () => {
    // Retrieve tasks from localStorage or initialize empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    const displayProgress = () => {
        const progressList = document.getElementById('taskProgress');
        progressList.innerHTML = ''; // Clear existing progress

        tasks.forEach((task, index) => {
            if (task.status === 'In Progress' || task.status === 'Completed') {
                const taskDiv = document.createElement('div');
                taskDiv.classList.add('border', 'p-4', 'bg-white', 'shadow-md', 'rounded-md', 'mb-6');

                const progressBarContainer = document.createElement('div');
                progressBarContainer.classList.add('relative', 'pt-2');

                const progressBar = document.createElement('div');
                progressBar.classList.add('bg-blue-600', 'h-2', 'rounded-full');
                progressBar.style.width = `${task.progress}%`; // Set width based on task progress

                progressBarContainer.appendChild(progressBar);

                taskDiv.innerHTML = `
                    <h3 class="font-semibold">${task.title}</h3>
                    <p>${task.description}</p>
                    <p><strong>Time Spent:</strong> ${task.timeSpent} hrs</p>
                    <p><strong>Priority:</strong> ${task.priority}</p>
                    <p><strong>Assigned by:</strong> ${task.reference}</p>
                    <div class="mt-2 text-sm text-gray-500">Progress: ${task.progress}%</div>
                `;
                
                taskDiv.appendChild(progressBarContainer);
                progressList.appendChild(taskDiv);
            }
        });
    };

    // Function to generate the progress chart
    const generateProgressChart = () => {
        const completedTasks = tasks.filter(task => task.status === 'Completed').length;
        const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length;
        const totalTasks = tasks.length;

        const chartData = {
            labels: ['Completed', 'In Progress', 'Remaining'],
            datasets: [{
                label: 'Task Progress',
                data: [completedTasks, inProgressTasks, totalTasks - (completedTasks + inProgressTasks)],
                backgroundColor: ['#4CAF50', '#FF9800', '#f44336'], // Green, Orange, Red
                borderColor: ['#388E3C', '#F57C00', '#D32F2F'],
                borderWidth: 1
            }]
        };

        const ctx = document.getElementById('taskProgressChart').getContext('2d');
        
        new Chart(ctx, {
            type: 'pie',
            data: chartData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return `${tooltipItem.label}: ${tooltipItem.raw} (${Math.round((tooltipItem.raw / totalTasks) * 100)}%)`;
                            }
                        }
                    }
                }
            }
        });
    };

    // Function to mark task as completed
    const markTaskAsCompleted = (taskIndex) => {
        tasks[taskIndex].status = 'Completed'; // Update status to Completed
        tasks[taskIndex].progress = 100; // Set progress to 100%
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayProgress(); // Re-render tasks
        generateProgressChart(); // Re-render the chart
    };

    // Example of adding an example task for testing
    // const addExampleTask = () => {
    //     const exampleTask = {
    //         title: "Complete Project A",
    //         description: "Finish the main tasks of Project A.",
    //         timeSpent: 12,
    //         priority: "High",
    //         reference: "Manager",
    //         status: "In Progress", // Change to 'Completed' to simulate completed task
    //         progress: 45, // Percentage progress (0 to 100)
    //     };

    //     tasks.push(exampleTask);
    //     localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to localStorage
    //     displayProgress(); // Re-render tasks
    //     generateProgressChart(); // Re-render the chart
    // };

    // Call functions on page load
    displayProgress();
    generateProgressChart();

    // Example: Add a task on page load (you can remove this line later)
    // addExampleTask(); // Remove this after testing

});

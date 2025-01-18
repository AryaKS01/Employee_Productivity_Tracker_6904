// Retrieve tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Filter tasks that are marked as "Completed"
function displayProgress() {
    const completedTasks = tasks.filter(task => task.status === 'Completed');

    const progressList = document.getElementById('taskProgress');
    // progressList.innerHTML = ''; // Clear existing progress

    completedTasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('border', 'p-4', 'mb-4');

        // Create the progress bar dynamically
        const progressBarContainer = document.createElement('div');
        progressBarContainer.classList.add('relative', 'pt-2');

        const progressBar = document.createElement('div');
        progressBar.classList.add('bg-blue-600', 'h-2', 'rounded-full');
        progressBar.style.width = `${task.progress}%`; // Set the width based on task progress

        // Append progress bar to the container
        progressBarContainer.appendChild(progressBar);

        taskDiv.innerHTML = `
            <h3 class="font-semibold">${task.title}</h3>
            <p>${task.description}</p>
            <p>Time Spent: ${task.timeSpent} hrs</p>
            <p>Priority: ${task.priority}</p>
            <p>Assigned by: ${task.reference}</p>
            <div class="mt-2 text-sm text-gray-500">Progress: ${task.progress}%</div>
        `;
        
        // Append progress bar container to taskDiv
        taskDiv.appendChild(progressBarContainer);
        
        // Append task to the task progress list
        progressList.appendChild(taskDiv);
    });
}

// Mark task as completed
function markTaskAsCompleted(taskIndex) {
    tasks[taskIndex].status = 'Completed';
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayProgress();
}

// Initialize page
window.onload = displayProgress;

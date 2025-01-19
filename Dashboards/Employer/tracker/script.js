// // Sidebar Tab Switching
// document.querySelectorAll('.sidebar nav ul li a').forEach(link => {
//   link.addEventListener('click', e => {
//     e.preventDefault();
//     document.querySelectorAll('.sidebar nav ul li a').forEach(l => l.classList.remove('active'));
//     document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
//     link.classList.add('active');
//     document.getElementById(link.dataset.target).classList.add('active');
//   });
// });

// // Local Storage Tasks Management
// const fetchTasks = () => {
//   const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//   populateTaskTable(tasks);
//   updateOverview(tasks);
//   initializeCharts(tasks);
// };

// const saveTasks = tasks => {
//   localStorage.setItem('tasks', JSON.stringify(tasks));
// };

// const populateTaskTable = tasks => {
//   const tableBody = document.getElementById('task-table-body');
//   tableBody.innerHTML = tasks.map((task, index) => `
//     <tr>
//       <td>${index + 1}</td>
//       <td>${task.name}</td>
//       <td>${task.type}</td>
//       <td>${task.priority}</td>
//       <td>${task.status}</td>
//       <td>${task.hours}</td>
//     </tr>
//   `).join('');
// };

// const updateOverview = tasks => {
//   const totalTasks = tasks.length;
//   const completedTasks = tasks.filter(t => t.status === 'Completed').length;
//   const avgEfficiency = ((completedTasks / totalTasks) * 100).toFixed(2) || 0;
//   document.getElementById('overview-cards').innerHTML = `
//     <div class="card"><h3>Total Tasks</h3><p>${totalTasks}</p></div>
//     <div class="card"><h3>Completed</h3><p>${completedTasks}</p></div>
//     <div class="card"><h3>Efficiency</h3><p>${avgEfficiency}%</p></div>
//   `;
// };

// // Initialize Charts
// const initializeCharts = tasks => {
//   // Pie Chart
//   new Chart(document.getElementById('pieChart'), {
//     type: 'pie',
//     data: {
//       labels: ['Completed', 'Pending'],
//       datasets: [{
//         data: [
//           tasks.filter(t => t.status === 'Completed').length,
//           tasks.filter(t => t.status !== 'Completed').length
//         ],
//         backgroundColor: ['#3498db', '#e74c3c']
//       }]
//     }
//   });

//   // Bar Chart
//   new Chart(document.getElementById('barChart'), {
//     type: 'bar',
//     data: {
//       labels: tasks.map(t => t.name),
//       datasets: [{
//         label: 'Hours Spent',
//         data: tasks.map(t => t.hours),
//         backgroundColor: '#34495e'
//       }]
//     }
//   });
// };

// // Toggle Theme
// document.getElementById('toggleThemeBtn').addEventListener('click', () => {
//   document.body.classList.toggle('dark-mode');
// });

// // Logout
// document.getElementById('logoutBtn').addEventListener('click', () => {
//   alert('Logged out successfully!');
// });

// // Initialize App
// document.addEventListener('DOMContentLoaded', fetchTasks);


  
  // Sidebar Tab Switching
document.querySelectorAll('.sidebar nav ul li a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.sidebar nav ul li a').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    link.classList.add('active');
    document.getElementById(link.dataset.target).classList.add('active');
  });
});

// Fetch Tasks from Local Storage
const fetchTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const transformedTasks = tasks.map(task => ({
    name: task.title || "Unnamed Task", // Map 'title' to 'name'
    type: task.category || "General",  // Map 'category' to 'type'
    priority: task.priority || "Low",
    status: task.completed ? "Completed" : "Pending", // Map 'completed' to 'status'
    hours: task.timeSpent || "0",
  }));
  populateTaskTable(transformedTasks);
  updateOverview(transformedTasks);
  initializeCharts(transformedTasks);
};

// Populate Task Table
const populateTaskTable = tasks => {
  const tableBody = document.getElementById('task-table-body');
  tableBody.innerHTML = tasks.map((task, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${task.name}</td>
      <td>${task.type}</td>
      <td>${task.priority}</td>
      <td>${task.status}</td>
      <td>${task.hours}</td>
    </tr>
  `).join('');
};

// Update Overview Cards
const updateOverview = tasks => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const avgEfficiency = ((completedTasks / totalTasks) * 100).toFixed(2) || 0;
  document.getElementById('overview-cards').innerHTML = `
    <div class="card"><h3>Total Tasks</h3><p>${totalTasks}</p></div>
    <div class="card"><h3>Completed</h3><p>${completedTasks}</p></div>
    <div class="card"><h3>Efficiency</h3><p>${avgEfficiency}%</p></div>
  `;
};

// Initialize Charts
const initializeCharts = tasks => {
  // Pie Chart
  new Chart(document.getElementById('pieChart'), {
    type: 'pie',
    data: {
      labels: ['Completed', 'Pending'],
      datasets: [{
        data: [
          tasks.filter(t => t.status === 'Completed').length,
          tasks.filter(t => t.status !== 'Completed').length
        ],
        backgroundColor: ['#3498db', '#e74c3c']
      }]
    }
  });

  // Bar Chart
  new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
      labels: tasks.map(t => t.name),
      datasets: [{
        label: 'Hours Spent',
        data: tasks.map(t => t.hours),
        backgroundColor: '#34495e'
      }]
    }
  });
};

// Toggle Theme
document.getElementById('toggleThemeBtn').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
  alert('Logged out successfully!');
});

// Initialize App
document.addEventListener('DOMContentLoaded', fetchTasks);

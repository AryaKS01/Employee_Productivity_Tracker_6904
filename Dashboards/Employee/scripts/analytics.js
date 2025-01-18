// from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

//  pie chart 
function displayPieChart() {
    const ctx = document.getElementById('taskPieChart').getContext('2d');

    
    const categories = tasks.reduce((acc, task) => {
        acc[task.category] = (acc[task.category] || 0) + 1;
        return acc;
    }, {});

    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(categories),
            datasets: [{
                data: Object.values(categories),
                backgroundColor: ['#FF5733', '#33FF57', '#3357FF'],
            }],
        },
    });
}


window.onload = displayPieChart;

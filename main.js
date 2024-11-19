// Get DOM elements
const form = document.querySelector('form');
const taskInput = document.getElementById('task');
const taskList = document.querySelector('.task-list');
const progressBar = document.getElementById('progress');
const numbersDisplay = document.getElementById('numbers');

// Initialize tasks array from localStorage or empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to localStorage
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to update progress bar and numbers
const updateProgress = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const progressPercent = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    
    progressBar.style.width = `${progressPercent}%`;
    numbersDisplay.textContent = `${completedTasks} / ${totalTasks}`;
};

// Function to create task element
const createTaskElement = (task) => {
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span>${task.text}</span>
        <button class="delete-btn">×</button>
    `;
    
    // Style the li element
    li.style.display = 'flex';
    li.style.alignItems = 'center';
    li.style.padding = '10px 20px';
    li.style.marginTop = '10px';
    li.style.background = 'var(--secondary-background)';
    li.style.borderRadius = '50px';
    li.style.width = '100%';
    li.style.maxWidth = '500px';
    
    // Style the checkbox
    const checkbox = li.querySelector('input');
    checkbox.style.marginRight = '10px';
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        saveTasks();
        updateProgress();
    });
    
    // Style the text
    const span = li.querySelector('span');
    span.style.flex = '1';
    span.style.color = 'var(--text)';
    
    // Style the delete button
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.style.background = 'linear-gradient(135deg, var(--purple), var(--teal))';
    deleteBtn.style.border = 'none';
    deleteBtn.style.borderRadius = '50%';
    deleteBtn.style.color = 'var(--text)';
    deleteBtn.style.fontSize = '18px';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.padding = '5px 10px';
    deleteBtn.style.transition = 'all 0.3s ease';
    deleteBtn.style.opacity = '0.8';
    deleteBtn.style.marginLeft = '10px';
    
    // Add hover effect
    deleteBtn.addEventListener('mouseover', () => {
        deleteBtn.style.opacity = '1';
        deleteBtn.style.transform = 'scale(1.1)';
        deleteBtn.style.boxShadow = '0 0 15px rgba(36, 254, 238, 0.3)';
    });
    
    deleteBtn.addEventListener('mouseout', () => {
        deleteBtn.style.opacity = '0.8';
        deleteBtn.style.transform = 'scale(1)';
        deleteBtn.style.boxShadow = 'none';
    });
    
    deleteBtn.addEventListener('click', () => {
        const index = tasks.indexOf(task);
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
        updateProgress();
    });
    
    return li;
};

// Function to render all tasks
const renderTasks = () => {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        taskList.appendChild(createTaskElement(task));
    });
    updateProgress();
};

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        const newTask = {
            text: taskText,
            completed: false
        };
        
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
});

// Initial render
renderTasks();



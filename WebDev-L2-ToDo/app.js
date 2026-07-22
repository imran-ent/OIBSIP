// DOM Elements
const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const pendingList = document.getElementById('pending-list');
const completedList = document.getElementById('completed-list');
const pendingCount = document.getElementById('pending-count');
const completedCount = document.getElementById('completed-count');
const pendingEmpty = document.getElementById('pending-empty');
const completedEmpty = document.getElementById('completed-empty');

// State Management: Load from localStorage or default to empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Master function to save to localStorage and update the UI
function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    render();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
}

// Renders the entire UI based on the current state array
function render() {
    pendingList.innerHTML = '';
    completedList.innerHTML = '';
    
    let pending = 0;
    let completed = 0;

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        
        if (task.completed) completed++; else pending++;

        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
            
            <div class="task-content">
                <span class="task-text ${task.completed ? 'completed-text' : ''}" id="text-${task.id}">${task.text}</span>
                <input type="text" class="edit-input hidden" id="edit-${task.id}" value="${task.text}">
                <div class="timestamp">Added: ${formatDate(task.timestamp)}</div>
            </div>
            
            <div class="task-actions">
                <button class="edit-btn" onclick="editTask(${task.id})" id="edit-btn-${task.id}">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        
        if (task.completed) {
            completedList.appendChild(li);
        } else {
            pendingList.appendChild(li);
        }
    });

    // Update Counts and Empty States
    pendingCount.textContent = `${pending} pending`;
    completedCount.textContent = `${completed} completed`;
    
    pendingEmpty.style.display = pending === 0 ? 'block' : 'none';
    completedEmpty.style.display = completed === 0 ? 'block' : 'none';
}

// Add a new task
function addTask() {
    const text = input.value.trim();
    if (!text) return; // Prevent empty tasks
    
    tasks.push({
        id: Date.now(),
        text: text,
        completed: false,
        timestamp: new Date().toISOString()
    });
    
    input.value = '';
    saveAndRender();
}

// Toggle completion status
window.toggleTask = function(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveAndRender();
    }
}

// Delete a task
window.deleteTask = function(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveAndRender();
}

// Handle inline editing
window.editTask = function(id) {
    const textSpan = document.getElementById(`text-${id}`);
    const editInput = document.getElementById(`edit-${id}`);
    const editBtn = document.getElementById(`edit-btn-${id}`);
    
    if (editInput.classList.contains('hidden')) {
        // Switch to edit mode
        textSpan.classList.add('hidden');
        editInput.classList.remove('hidden');
        editBtn.textContent = 'Save';
        editInput.focus();
    } else {
        // Save the edits
        const newText = editInput.value.trim();
        if (newText) {
            const task = tasks.find(t => t.id === id);
            task.text = newText;
        }
        saveAndRender();
    }
}

// Event Listeners
addBtn.addEventListener('click', addTask);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Initial load
render();
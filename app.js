// App Data Structure
const appData = {
    date: new Date().toDateString(),
    nonNegotiables: [],
    goodToDos: [],
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    updateDateDisplay();
    renderTasks();
    updateDashboard();
});

// ===== DATA MANAGEMENT =====

// Load data from localStorage
function loadData() {
    const savedData = localStorage.getItem('disciplineAppData');
    if (savedData) {
        const data = JSON.parse(savedData);
        // Check if it's a new day
        if (data.date !== new Date().toDateString()) {
            // New day - reset tasks but keep history
            appData.date = new Date().toDateString();
            appData.nonNegotiables = [];
            appData.goodToDos = [];
            saveData();
        } else {
            appData.nonNegotiables = data.nonNegotiables || [];
            appData.goodToDos = data.goodToDos || [];
        }
    } else {
        saveData();
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('disciplineAppData', JSON.stringify(appData));
}

// Update date display
function updateDateDisplay() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('en-US', options);
    document.getElementById('dateDisplay').textContent = formattedDate;
}

// ===== NON-NEGOTIABLES MANAGEMENT =====

function addNonNegotiable() {
    const input = document.getElementById('nonNegotiableInput');
    const weightInput = document.getElementById('nonNegotiableWeight');
    const task = input.value.trim();
    const weight = parseInt(weightInput.value) || 5;

    if (!task) {
        showToast('Please enter a task');
        return;
    }

    if (appData.nonNegotiables.length >= 5) {
        showToast('Maximum 5 non-negotiables allowed!');
        return;
    }

    if (weight < 1 || weight > 10) {
        showToast('Weight must be between 1-10');
        return;
    }

    appData.nonNegotiables.push({
        id: Date.now(),
        text: task,
        weight: weight,
        completed: false,
    });

    input.value = '';
    weightInput.value = 5;
    saveData();
    renderTasks();
    updateDashboard();
    showToast('Non-negotiable added!');
}

function deleteNonNegotiable(id) {
    appData.nonNegotiables = appData.nonNegotiables.filter(task => task.id !== id);
    saveData();
    renderTasks();
    updateDashboard();
    showToast('Task removed');
}

function toggleNonNegotiable(id) {
    const task = appData.nonNegotiables.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveData();
        renderTasks();
        updateDashboard();
    }
}

// ===== GOOD TO DO MANAGEMENT =====

function addGoodToDo() {
    const input = document.getElementById('goodToDoInput');
    const weightInput = document.getElementById('goodToDoWeight');
    const task = input.value.trim();
    const weight = parseInt(weightInput.value) || 3;

    if (!task) {
        showToast('Please enter a task');
        return;
    }

    if (weight < 1 || weight > 5) {
        showToast('Weight must be between 1-5');
        return;
    }

    appData.goodToDos.push({
        id: Date.now(),
        text: task,
        weight: weight,
        completed: false,
    });

    input.value = '';
    weightInput.value = 3;
    saveData();
    renderTasks();
    updateDashboard();
    showToast('Good to do added!');
}

function deleteGoodToDo(id) {
    appData.goodToDos = appData.goodToDos.filter(task => task.id !== id);
    saveData();
    renderTasks();
    updateDashboard();
    showToast('Task removed');
}

function toggleGoodToDo(id) {
    const task = appData.goodToDos.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveData();
        renderTasks();
        updateDashboard();
    }
}

// ===== RENDERING =====

function renderTasks() {
    renderNonNegotiables();
    renderGoodToDos();
    updateCounts();
}

function renderNonNegotiables() {
    const container = document.getElementById('nonNegotiablesList');
    container.innerHTML = '';

    if (appData.nonNegotiables.length === 0) {
        container.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">No non-negotiables yet</p>';
        return;
    }

    appData.nonNegotiables.forEach(task => {
        const taskEl = document.createElement('div');
        taskEl.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskEl.innerHTML = `
            <div class="task-content">
                <div class="task-text">${task.text}</div>
                <span class="task-weight">Weight: ${task.weight}</span>
            </div>
            <div class="task-actions">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} 
                       onchange="toggleNonNegotiable(${task.id})">
                <button class="delete-btn" onclick="deleteNonNegotiable(${task.id})">✕</button>
            </div>
        `;
        container.appendChild(taskEl);
    });
}

function renderGoodToDos() {
    const container = document.getElementById('goodToDoList');
    container.innerHTML = '';

    if (appData.goodToDos.length === 0) {
        container.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">No good to do tasks yet</p>';
        return;
    }

    appData.goodToDos.forEach(task => {
        const taskEl = document.createElement('div');
        taskEl.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskEl.innerHTML = `
            <div class="task-content">
                <div class="task-text">${task.text}</div>
                <span class="task-weight">Weight: ${task.weight}</span>
            </div>
            <div class="task-actions">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} 
                       onchange="toggleGoodToDo(${task.id})">
                <button class="delete-btn" onclick="deleteGoodToDo(${task.id})">✕</button>
            </div>
        `;
        container.appendChild(taskEl);
    });
}

function updateCounts() {
    const nonNegCount = appData.nonNegotiables.length;
    const goodToDoCount = appData.goodToDos.length;

    document.getElementById('nonNegotiableCount').textContent = `${nonNegCount}/5`;
    document.getElementById('goodToDoCount').textContent = goodToDoCount;
}

// ===== DASHBOARD CALCULATIONS =====

function calculateScores() {
    // Non-Negotiables
    const nonNegCompletedWeight = appData.nonNegotiables
        .filter(t => t.completed)
        .reduce((sum, t) => sum + t.weight, 0);
    const nonNegTotalWeight = appData.nonNegotiables.reduce((sum, t) => sum + t.weight, 0);

    // Good to Do
    const goodToDoCompletedWeight = appData.goodToDos
        .filter(t => t.completed)
        .reduce((sum, t) => sum + t.weight, 0);
    const goodToDoTotalWeight = appData.goodToDos.reduce((sum, t) => sum + t.weight, 0);

    const totalCompleted = nonNegCompletedWeight + goodToDoCompletedWeight;
    const totalMax = nonNegTotalWeight + goodToDoTotalWeight;

    return {
        nonNegCompleted: nonNegCompletedWeight,
        nonNegTotal: nonNegTotalWeight,
        goodToDoCompleted: goodToDoCompletedWeight,
        goodToDoTotal: goodToDoTotalWeight,
        totalCompleted,
        totalMax,
        percentage: totalMax === 0 ? 0 : Math.round((totalCompleted / totalMax) * 100),
    };
}

function updateDashboard() {
    const scores = calculateScores();

    // Update score boxes
    document.getElementById('nonNegotiableScore').textContent = 
        `${scores.nonNegCompleted}/${scores.nonNegTotal}`;
    document.getElementById('goodToDoScore').textContent = 
        `${scores.goodToDoCompleted}/${scores.goodToDoTotal}`;

    // Update total score
    document.getElementById('totalScore').textContent = scores.percentage + '%';
    document.getElementById('totalPoints').textContent = scores.totalCompleted;
    document.getElementById('maxPoints').textContent = scores.totalMax;

    // Update progress bars
    const nonNegPercent = scores.nonNegTotal === 0 ? 0 : 
        Math.round((scores.nonNegCompleted / scores.nonNegTotal) * 100);
    const goodToDoPercent = scores.goodToDoTotal === 0 ? 0 : 
        Math.round((scores.goodToDoCompleted / scores.goodToDoTotal) * 100);

    document.getElementById('nonNegProgressFill').style.width = nonNegPercent + '%';
    document.getElementById('nonNegProgress').textContent = nonNegPercent + '%';
    document.getElementById('goodToDoProgressFill').style.width = goodToDoPercent + '%';
    document.getElementById('goodToDoProgress').textContent = goodToDoPercent + '%';

    // Update summary stats
    const completedCount = appData.nonNegotiables.filter(t => t.completed).length +
        appData.goodToDos.filter(t => t.completed).length;
    const totalTasks = appData.nonNegotiables.length + appData.goodToDos.length;
    const pendingCount = totalTasks - completedCount;
    
    const allWeights = [...appData.nonNegotiables, ...appData.goodToDos];
    const avgWeight = allWeights.length === 0 ? 0 : 
        Math.round((allWeights.reduce((sum, t) => sum + t.weight, 0) / allWeights.length) * 10) / 10;

    document.getElementById('completedCount').textContent = completedCount;
    document.getElementById('pendingCount').textContent = pendingCount;
    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('avgWeight').textContent = avgWeight;

    // Update focus areas
    updateFocusAreas();
}

function updateFocusAreas() {
    const focusContainer = document.getElementById('focusAreas');
    
    // Get incomplete non-negotiables
    const incompleteTasks = appData.nonNegotiables
        .filter(t => !t.completed)
        .sort((a, b) => b.weight - a.weight);

    if (incompleteTasks.length === 0 && appData.goodToDos.filter(t => !t.completed).length === 0) {
        focusContainer.innerHTML = '<p class="placeholder-text">🎉 Great job! All tasks completed or no tasks yet</p>';
        return;
    }

    focusContainer.innerHTML = '';

    if (incompleteTasks.length > 0) {
        focusContainer.innerHTML += '<h4 style="margin-bottom: 10px; color: #1e293b;">Priority Focus (Non-Negotiables):</h4>';
        incompleteTasks.slice(0, 3).forEach(task => {
            const focusEl = document.createElement('div');
            focusEl.className = 'focus-item';
            focusEl.innerHTML = `
                <div class="focus-item-name">${task.text}</div>
                <span class="focus-item-priority">W: ${task.weight}</span>
            `;
            focusContainer.appendChild(focusEl);
        });
    }

    // Get top incomplete good to do tasks
    const incompleteGoodToDo = appData.goodToDos
        .filter(t => !t.completed)
        .sort((a, b) => b.weight - a.weight)
        .slice(0, 2);

    if (incompleteGoodToDo.length > 0) {
        focusContainer.innerHTML += '<h4 style="margin: 15px 0 10px 0; color: #1e293b;">Bonus Tasks:</h4>';
        incompleteGoodToDo.forEach(task => {
            const focusEl = document.createElement('div');
            focusEl.className = 'focus-item';
            focusEl.innerHTML = `
                <div class="focus-item-name">${task.text}</div>
                <span class="focus-item-priority">W: ${task.weight}</span>
            `;
            focusContainer.appendChild(focusEl);
        });
    }
}

// ===== AI SUGGESTIONS =====

async function getAISuggestions() {
    const suggestionsContainer = document.getElementById('aiSuggestions');
    
    if (appData.nonNegotiables.length === 0 && appData.goodToDos.length === 0) {
        showToast('Add tasks first to get suggestions');
        return;
    }

    // Show loading state
    suggestionsContainer.innerHTML = '<p style="color: #999;">🤖 Getting AI suggestions...</p>';

    try {
        const prompt = generateAIPrompt();
        
        // Call the API
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'YOUR_API_KEY_HERE', // User needs to add their API key
                'anthropic-version': '2023-06-01',
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 500,
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
            }),
        });

        if (!response.ok) {
            if (response.status === 401) {
                displayMockSuggestions();
                showToast('Add your Anthropic API key to enable AI features!');
                return;
            }
            throw new Error('API request failed');
        }

        const data = await response.json();
        const suggestions = data.content[0].text;
        displaySuggestions(suggestions);
        showToast('AI suggestions generated!');
    } catch (error) {
        console.error('Error fetching AI suggestions:', error);
        displayMockSuggestions();
        showToast('Using demo suggestions (add API key for real AI)');
    }
}

function generateAIPrompt() {
    const scores = calculateScores();
    const incompleteNonNeg = appData.nonNegotiables.filter(t => !t.completed);
    const incompleteGoodToDo = appData.goodToDos.filter(t => !t.completed);

    const prompt = `Based on today's discipline tracking:

Non-Negotiables (Required):
${incompleteNonNeg.length > 0 ? incompleteNonNeg.map(t => `- ${t.text} (weight: ${t.weight})`).join('\n') : 'All completed!'}

Good to Do (Optional):
${incompleteGoodToDo.length > 0 ? incompleteGoodToDo.map(t => `- ${t.text} (weight: ${t.weight})`).join('\n') : 'All completed!'}

Current Progress: ${scores.percentage}% (${scores.totalCompleted}/${scores.totalMax} points)

Please provide 3-4 brief, actionable suggestions to help me optimize my day and achieve my goals. Focus on time management, prioritization, and motivation strategies.`;

    return prompt;
}

function displaySuggestions(suggestionText) {
    const suggestionsContainer = document.getElementById('aiSuggestions');
    suggestionsContainer.innerHTML = '';

    const suggestions = suggestionText.split('\n').filter(s => s.trim().length > 0);
    
    suggestions.forEach(suggestion => {
        if (suggestion.trim().length > 0) {
            const suggestionEl = document.createElement('div');
            suggestionEl.className = 'suggestion-item';
            suggestionEl.textContent = suggestion.trim();
            suggestionsContainer.appendChild(suggestionEl);
        }
    });
}

function displayMockSuggestions() {
    const mockSuggestions = `
💡 Focus on completing your non-negotiables first - they're the foundation of your discipline!
⏰ Break down larger tasks into 25-minute focused sessions (Pomodoro technique)
🎯 Review your progress hourly to stay motivated and on track
✅ Celebrate small wins - completing each task builds momentum for the next
🔄 If falling behind, prioritize quality over quantity for remaining tasks
    `;
    displaySuggestions(mockSuggestions);
}

// ===== UTILITY FUNCTIONS =====

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function resetDay() {
    const confirmed = confirm('Are you sure you want to reset all tasks for today?');
    if (confirmed) {
        appData.nonNegotiables = [];
        appData.goodToDos = [];
        saveData();
        renderTasks();
        updateDashboard();
        showToast('Day reset successfully!');
    }
}

function exportData() {
    const scores = calculateScores();
    const exportObj = {
        date: appData.date,
        nonNegotiables: appData.nonNegotiables,
        goodToDos: appData.goodToDos,
        summary: {
            totalScore: scores.percentage + '%',
            completedPoints: scores.totalCompleted,
            maxPoints: scores.totalMax,
            completedTasks: appData.nonNegotiables.filter(t => t.completed).length +
                appData.goodToDos.filter(t => t.completed).length,
            totalTasks: appData.nonNegotiables.length + appData.goodToDos.length,
        },
    };

    const dataStr = JSON.stringify(exportObj, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `discipline-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Data exported successfully!');
}

// ===== KEYBOARD SHORTCUTS =====

document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement.id === 'nonNegotiableInput') {
            addNonNegotiable();
        } else if (activeElement.id === 'goodToDoInput') {
            addGoodToDo();
        }
    }
});

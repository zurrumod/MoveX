let totalTracked = 0;
let dailyGoal = 0;
let username = '';
let reminderTime = '';
let audio = new Audio('your-music-file.mp3'); // Music file for workout

window.onload = function() {
    loadProgressFromStorage();
    loadUsernameFromStorage();
};

// Tab switching
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach((tab) => {
        tab.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}

// Tracking function
function trackWorkout(workout) {
    const inputId = workout.toLowerCase().replace(/\s/g, '-') + '-input';
    const value = document.getElementById(inputId).value;

    if (!value || value <= 0) {
        alert('Please enter a valid number!');
        return;
    }

    alert(`${value} ${workout} tracked successfully!`);
    addToProgress(workout, value);
    totalTracked += parseInt(value);
    updateProgressSummary();
    saveProgressToStorage();
}

// Add workout to progress
function addToProgress(workout, value) {
    const completedList = document.querySelector('.completed-list');
    const entry = document.createElement('p');
    entry.textContent = `${workout}: ${value} on ${new Date().toLocaleTimeString()}`;
    completedList.appendChild(entry);
}

// Update progress summary
function updateProgressSummary() {
    const progressSummary = document.getElementById('progress-summary');
    progressSummary.textContent = `Total Reps/Minutes tracked: ${totalTracked}`;
    if (dailyGoal > 0) {
        const progressPercentage = Math.min((totalTracked / dailyGoal) * 100, 100);
        progressSummary.innerHTML += `<br>Progress towards goal: ${progressPercentage.toFixed(2)}%`;
    }
}

// Save progress to LocalStorage
function saveProgressToStorage() {
    const progressData = {
        totalTracked: totalTracked,
        dailyGoal: dailyGoal,
    };
    localStorage.setItem('progressData', JSON.stringify(progressData));
}

// Load progress from LocalStorage
function loadProgressFromStorage() {
    const storedData = localStorage.getItem('progressData');
    if (storedData) {
        const progressData = JSON.parse(storedData);
        totalTracked = progressData.totalTracked || 0;
        dailyGoal = progressData.dailyGoal || 0;
        updateProgressSummary();
    }
}

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Save Username
function saveUsername() {
    username = document.getElementById('username').value;
    if (username) {
        alert(`Welcome, ${username}!`);
        localStorage.setItem('username', username);
    }
}

// Load Username from Storage
function loadUsernameFromStorage() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        username = storedUsername;
        alert(`Welcome back, ${username}!`);
    }
}

// Set daily workout goal
function saveGoal() {
    const goal = document.getElementById('daily-goal').value;
    if (goal && goal > 0) {
        dailyGoal = goal;
        alert(`Your daily goal of ${goal} has been saved!`);
        saveProgressToStorage();
        updateProgressSummary();
    } else {
        alert('Please enter a valid goal.');
    }
}

// Set a reminder for workouts
function setReminder() {
    reminderTime = document.getElementById('reminder-time').value;
    if (reminderTime) {
        alert(`Your reminder is set for ${reminderTime}`);
        localStorage.setItem('reminderTime', reminderTime);
    }
}

// Play music during workouts
function playMusic() {
    audio.play();
    alert('Music is playing! Let\'s get moving!');
}

// Pause music
function pauseMusic() {
    audio.pause();
    alert('Music paused. Keep going!');
}

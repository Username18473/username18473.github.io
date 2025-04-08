function updateTime() {
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    if (!timeElement || !dateElement) return;
    const now = new Date();

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const year = now.getFullYear().toString().substr(-2); // Get last two digits of the year

    timeElement.textContent = `${hours}:${minutes}`;
    dateElement.textContent = `${month}/${day}/${year}`;
}

setInterval(updateTime, 1000);
updateTime();

function goBack() {
    const webview = document.getElementById('webview');
    if (webview) {
        webview.contentWindow.history.back();
    }
}

function goForward() {
    const webview = document.getElementById('webview');
    if (webview) {
        webview.contentWindow.history.forward();
    }
}

function loadPage() {
    const urlBar = document.getElementById('url-bar');
    const webview = document.getElementById('webview');
    if (urlBar && webview) {
        let url = urlBar.value;
        if (!url.startsWith('http')) {
            url = 'https://' + url; // Add https if missing
        }
        webview.src = url;
    }
}

function closeBrowser() {
    const browser = document.getElementById('browser');
    if (browser) {
        browser.style.display = 'none';
    }
}

// Reopen browser when browser icon is clicked
document.getElementById('browserIcon').addEventListener('click', function() {
    const browser = document.getElementById('browser');
    if (browser) {
        browser.style.display = 'block';
    }
});

// Toggle start menu visibility
function toggleStartMenu() {
    const startMenu = document.getElementById('start-menu');
    if (startMenu) {
        startMenu.style.display = (startMenu.style.display === 'none' || startMenu.style.display === '') ? 'block' : 'none';
    }
}

// Reopen browser when "Browser" link in start menu is clicked
document.getElementById('startMenuBrowserLink').addEventListener('click', function() {
    const browser = document.getElementById('browser');
    if (browser) {
        browser.style.display = 'block';
    }
});

document.getElementById("fullscreen-btn").addEventListener("click", () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
});

// Handling the form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // For demonstration purposes, log the username and password
    console.log('Username:', username);
    console.log('Password:', password);

    // Add your form submission logic here

    // Show the desktop after login
    const desktop = document.getElementById('desktop');
    const loginContainer = document.getElementById('loginContainer');
    if (desktop && loginContainer) {
        desktop.style.display = 'block';
        loginContainer.style.display = 'none';
    }
});

// Hide the desktop icons during login
document.addEventListener('DOMContentLoaded', function() {
    const loginContainer = document.getElementById('loginContainer');
    const desktop = document.getElementById('desktop');
    if (loginContainer && desktop) {
        if (loginContainer.style.display !== 'none') {
            desktop.style.display = 'none';
        }
    }
});

// Add JavaScript to make the browser window draggable
function makeElementDraggable(element) {
    if (!element) return;
    let isDragging = false;
    let offsetX, offsetY;

    element.addEventListener('mousedown', function(e) {
        console.log('Mouse down on element');
        isDragging = true;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (isDragging) {
            console.log('Dragging element');
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
        }
    }

    function onMouseUp() {
        console.log('Mouse up, stop dragging');
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}

// Make the browser element draggable
makeElementDraggable(document.getElementById('browser'));

// Function to open My PC popup
function openMyPC() {
    const myPCPopup = document.getElementById('myPCPopup');
    if (myPCPopup) {
        myPCPopup.style.display = 'block';
    }
}

// Function to close My PC popup
function closeMyPC() {
    const myPCPopup = document.getElementById('myPCPopup');
    if (myPCPopup) {
        myPCPopup.style.display = 'none';
    }
}

// Make the My PC popup draggable
makeElementDraggable(document.getElementById('myPCPopup'));

function logoff() {
    // Perform logoff actions here
    // For example, redirect to a logoff page or clear session data
    window.location.href = "Logoff.html"; // Redirect to a logoff page
}

let currentPlayer = 'X';

function makeMove(cellNumber) {
    const cell = document.getElementById(`cell-${cellNumber}`);
    if (cell && cell.textContent === '') {
        cell.textContent = currentPlayer;
        if (checkWin()) {
            alert(`${currentPlayer} wins!`);
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            botMove();
        }
    }
}

function checkWin() {
    const winningCombinations = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
        [1, 5, 9], [3, 5, 7]             // Diagonals
    ];

    return winningCombinations.some(combination => {
        return combination.every(index =>
            document.getElementById(`cell-${index}`).textContent === currentPlayer
        );
    });
}

function resetGame() {
    for (let i = 1; i <= 9; i++) {
        const cell = document.getElementById(`cell-${i}`);
        if (cell) {
            cell.textContent = '';
        }
    }
    currentPlayer = 'X';
}

function botMove() {
    // Find the first empty cell
    let emptyCell = null;
    for (let i = 1; i <= 9; i++) {
        const cell = document.getElementById(`cell-${i}`);
        if (cell && cell.textContent === '') {
            emptyCell = cell;
            break;
        }
    }

    if (emptyCell) {
        // Bot places its mark
        emptyCell.textContent = currentPlayer;

        // Check if the bot won
        if (checkWin()) {
            alert(`${currentPlayer} wins!`);
            resetGame();
            return;
        }

        // Switch back to player's turn
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function toggleControlPanel() {
    const controlPanel = document.getElementById('control-panel');
    if (controlPanel) {
        controlPanel.style.display = (controlPanel.style.display === 'none' || controlPanel.style.display === '') ? 'block' : 'none';
    }
}

function performAction1() {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF5'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
}

// Function to perform Action 1
function performAction1() {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF5'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
}

// Adding event listener for Action 1 button
document.getElementById('action1-btn').addEventListener('click', performAction1);

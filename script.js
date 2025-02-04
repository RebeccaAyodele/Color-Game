const colorBox = document.getElementById("colorBox");
const colorOptions = document.getElementById("colorOptions");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");

let score = 0;
let targetColor = "";
let colors = [];

// GENERATE A RANDOM RGB COLOR
function getRandomColor() {
    return `rgb(${rand(256)}, ${rand(256)}, ${rand(256)})`;
}

function rand(max) {
    return Math.floor(Math.random() * max);
}

// GENERATE AND DISPLAY COLOR OPTIONS WHICH WILL ONLY UPDATE AFTER A CORRECT GUESS
function generateColors() {
    colors = [targetColor];
    while (colors.length < 6) {
        let newColor = getRandomColor();
        if (!colors.includes(newColor)) colors.push(newColor);
    }

    colors.sort(() => Math.random() - 0.5);
    colorOptions.innerHTML = "";

    colors.forEach(color => {
        const button = document.createElement("button");
        button.style.backgroundColor = color;
        button.setAttribute("data-testid", "colorOption");
        button.onclick = () => checkGuess(color);
        colorOptions.appendChild(button);
    });
}

// TO START A NEW GAME
function newGame() {
    gameStatus.textContent = "";
    score = 0;
    scoreDisplay.textContent = score;
    setNewTargetColor();
}

// TO SET A NEW TARGET COLOR color AND GENERATE BUTTONS
function setNewTargetColor() {
    targetColor = getRandomColor();
    colorBox.style.backgroundColor = targetColor;
    generateColors();
}

// TO CHECK IF THE GUESS IS CORRECT
function checkGuess(selectedColor) {
    if (selectedColor === targetColor) {
        gameStatus.textContent = "Correct!";
        gameStatus.style.color = "green";
        score++;
        scoreDisplay.textContent = score;

        colorBox.classList.add("correct");
        setTimeout(() => {
            colorBox.classList.remove("correct");
            setNewTargetColor(); // Update colors only after a correct guess
        }, 500);
    } else {
        gameStatus.textContent = "Wrong! Try again.";
        gameStatus.style.color = "red";

        colorBox.classList.add("wrong");
        setTimeout(() => colorBox.classList.remove("wrong"), 300);
    }
}

// START THE GAME AND ADD EVENT LISTENER FOR NEW GAME
newGameButton.addEventListener("click", newGame);
newGame();

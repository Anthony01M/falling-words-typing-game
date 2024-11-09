const words = ["apple", "banana", "cherry", "date", "elderberry"];
let currentWord = "";
let wordElement;
let interval;

function startGame() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    wordElement = document.createElement("div");
    wordElement.textContent = currentWord;
    wordElement.style.position = "absolute";
    wordElement.style.top = "0px";
    wordElement.style.left = "50%";
    wordElement.style.transform = "translateX(-50%)";
    wordElement.style.fontSize = "24px";
    wordElement.style.color = "#333";
    document.getElementById("falling-words").appendChild(wordElement);

    interval = setInterval(moveWordDown, 100);
}

function moveWordDown() {
    const top = parseInt(wordElement.style.top);
    const gameContainerHeight = document.getElementById("game-container").offsetHeight;
    if (top >= gameContainerHeight - 50) {
        clearInterval(interval);
        alert("Game Over!");
        document.getElementById("falling-words").removeChild(wordElement);
        startGame();
    } else {
        wordElement.style.top = top + 5 + "px";
    }
}

document.getElementById("word-input").addEventListener("input", function (e) {
    const input = e.target.value;
    let highlightedText = "";

    for (let i = 0; i < currentWord.length; i++) {
        if (i < input.length) {
            if (input[i] === currentWord[i]) {
                highlightedText += `<span style="color: green;">${currentWord[i]}</span>`;
            } else {
                highlightedText += `<span style="color: red;">${currentWord[i]}</span>`;
            }
        } else {
            highlightedText += currentWord[i];
        }
    }

    wordElement.innerHTML = highlightedText;

    if (input === currentWord) {
        clearInterval(interval);
        document.getElementById("falling-words").removeChild(wordElement);
        e.target.value = "";
        startGame();
    }
});

document.getElementById("word-input").addEventListener("copy", function (e) {
    e.preventDefault();
});

document.getElementById("word-input").addEventListener("paste", function (e) {
    e.preventDefault();
});

document.addEventListener('DOMContentLoaded', function () {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#000000', '#FF5733', '#FF8C00', '#FFD700', '#ADFF2F', '#00FF7F', '#00CED1', '#1E90FF', '#9370DB', '#FF1493', '#000000'];
    let colorIndex = 0;

    setInterval(() => {
        document.body.style.backgroundColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 5000);
});

startGame();
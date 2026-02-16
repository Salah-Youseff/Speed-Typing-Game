const words = ["Salah", "Cat", "Dog"];

// Setting Levels
const lvls = {
    "easy": 5,
    "normal": 3,
    "hard": 2
};

// Catch Selectors
let startButon = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let defaultLevelName = null // Change Level From Here, It should be null to update its value from scope forEach and can use it out of this scope
let defaultLevelSeconds = null // It should be null to update its value from scope forEach and can use it out of this scope
let btnOption = document.querySelectorAll(".btn-chose");
let btnPlayAgain = document.querySelector(".play-again-con")

btnOption.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        btnOption.forEach((el) => {
            el.classList.remove("clicked");
            el.classList.add("option");
        })
        e.currentTarget.classList.add("clicked")
        e.currentTarget.classList.remove("option")
        let chosenLevel = e.currentTarget.value
        defaultLevelName = chosenLevel
        defaultLevelSeconds = lvls[defaultLevelName];
        lvlNameSpan.innerHTML = defaultLevelName;
        secondSpan.innerHTML = defaultLevelSeconds;
        timeLeftSpan.innerHTML = defaultLevelSeconds;   
        finishMessage.innerHTML = ""
    });
});
// Setting Level Name + Seconds + Score
scoreTotal.innerHTML = words.length;
input.disabled = true;
// Disable Paste Event
input.onpaste = function () {
    return false
};

// Start Game
startButon.onclick = function () {
    if (!defaultLevelName) {
        finishMessage.innerHTML = "Choose Level First";
        return;
    }
    this.remove();
    input.disabled = false; 
    input.focus();
    // Generate Word Function
    genWords();
};

function genWords() {
    if (!defaultLevelName) {
        finishMessage.innerHTML = "Choose Level First"
        return;
    }
    // Get Random Word From Array
    let randomWord = words[Math.floor(Math.random() * words.length)];
    // Get WOrd Index
    let wordIndex = words.indexOf(randomWord);
    // Remove Word From The Array
    words.splice(wordIndex, 1);
    // Show The randomWord
    theWord.innerHTML = randomWord;
    // Empty upcoming Word
    upcomingWords.innerHTML = "";
    // Generate Upcoming Words
    genUpcomingWords ();
    // Call Start Play Function
    startPlay();
};

function genUpcomingWords () {
    for (let i = 0; i < words.length; i++) {
        // Create Div Element
        let div = document.createElement("div");
        let txt = document.createTextNode(words[i]);
        div.appendChild(txt);
        upcomingWords.appendChild(div);
    }
};

function startPlay() {
    if (!defaultLevelName) {
        finishMessage.innerHTML = "Choose Level First"
        return;
    };
    btnOption.forEach(btn => btn.disabled = true);
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if (timeLeftSpan.innerHTML === "0") {
            // Stop Timer
            clearInterval(start);
            // Compare Words
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                // Empty Input Field
                input.value = "";
                // Increase Score
                scoreGot.innerHTML++;
                // Call Generate Words Function
                callGenWordsFunIfAny();
            } else {
                let span = document.createElement("span");
                span.className = "lose";
                let spanText = document.createTextNode("Game Over! You Lose, You Need To Be Faster, Try Again");
                span.appendChild(spanText);
                finishMessage.appendChild(span);
                input.disabled = true;
                btnPlayAgain.style.display = "block";
                btnPlayAgain.addEventListener("click", () => {
                    window.location.reload()
                });
            }
        }
    }, 1000);
};

function callGenWordsFunIfAny() {
    if (words.length > 0) {
        // Call Generate Words Function
        genWords();
    } else {
        let span = document.createElement("span");
        span.className = "win";
        let spanText = document.createTextNode("Congratz! You Win");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
        // Remove Upcoming Words
        upcomingWords.remove();
        input.disabled = true;
        btnPlayAgain.style.display = "block";
        btnPlayAgain.addEventListener("click", () => {
            window.location.reload()
        });
    }
};


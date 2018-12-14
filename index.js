"use strict";
const startButton = document.querySelector(".start-button");
const colorOne = document.querySelector(".color1");
const colorTwo = document.querySelector(".color2");
const colorThree = document.querySelector(".color3");
const youWon = document.querySelector(".you-won");
const youLost = document.querySelector(".you-lost");
const instructions = document.querySelector(".instructions");
const colorBlock = document.querySelector(".color-block");
const lostAnswer = document.querySelector(".answer");
const yourAnswer = document.querySelector(".your-answer");
const body = document.querySelector("body");
const yourScore = document.querySelector(".score");
const yourHighscore = document.querySelector(".high-score");
const yourPercentage = document.querySelector(".percentage");
const yourFraction = document.querySelector(".fraction");
const timedStart = document.querySelector(".timed-start");
const time = document.querySelector(".time");
const timedHighscore = document.querySelector(".timed-high-score");
const finalScore = document.querySelector(".final-score");
const quit = document.querySelector(".quit");
let colorCorrect = "";
let colorGroup = "";
let score = 0;
let highscore = 0;
let timedModeHighscore = 0;
let totalCorrect = 0;
let totalGoes = 0;
let count = false;
let interval = 0;
let timedMode = false;
yourScore.innerText = "Your score is: " + score;
yourHighscore.innerText = "Your highscore is: " + highscore;
yourPercentage.innerText = "Your correct percentage is: 0%";
yourFraction.innerText = totalCorrect + "/" + totalGoes;
colorOne.addEventListener("click", answer);
colorTwo.addEventListener("click", answer);
colorThree.addEventListener("click", answer);
startButton.addEventListener("click", randomiseColor);
timedStart.addEventListener("click", randomiseColor);
quit.addEventListener("click", quitToMainMenu);

function randomiseColor(){
    if (event.target.innerText === "play timed mode" || event.target.innerText === "retry" || timedMode === true) {
        if (count === false) timer()
        instructions.innerText = "Get as many correct as you can in 30 seconds"
        timedMode = true;
    } else timedMode = false;
    let x = Math.floor(Math.random() * 3) + 1;
    if (x === 1) startGame(colorOne,colorTwo,colorThree);
    else if (x === 2) startGame(colorTwo,colorOne,colorThree);
    else startGame(colorThree,colorTwo,colorOne);
    }

function timer(){
    count = 30
    interval = setInterval(() => {
        count -= 0.1; 
        time.innerText = count.toFixed(1);
        if (count.toFixed(1) == 0.0) {
            clearInterval(interval);
            timeup();
        }
    }, 100);
}

function startGame(colorN,colorN2,colorN3){
    if (timedMode === true) {
        timedHighscore.classList.remove("hidden")
        time.classList.remove("hidden");
    } else{
        yourHighscore.classList.remove("hidden");
    }
    quit.classList.remove("hidden");
    yourPercentage.classList.remove("hidden");
    yourScore.classList.remove("hidden");
    yourFraction.classList.remove("hidden");
    timedStart.classList.add("hidden");
    colorOne.classList.remove("hidden");
    colorTwo.classList.remove("hidden");
    colorThree.classList.remove("hidden");
    finalScore.classList.add("hidden");
    youLost.classList.add("hidden");
    youWon.classList.add("hidden");
    startButton.classList.add("hidden");
    instructions.classList.remove("hidden");
    instructions.innerText = "Click the name you think the color is";
    lostAnswer.classList.add("hidden");
    yourAnswer.classList.add("hidden");
    startButton.innerText = "next";
    colorGroup = Math.floor(Math.random() * (colors.length));
    colorCorrect = Math.floor(Math.random() * (colors[colorGroup].length));
    colorBlock.classList.remove("hidden");
    colorN.innerText = colors[colorGroup][colorCorrect];
    let colorIncorrect = colorCorrect;
    while (colorIncorrect === colorCorrect) {
        colorIncorrect = Math.floor(Math.random() * (colors[colorGroup].length));
    }
    colorN2.innerText = colors[colorGroup][colorIncorrect];
    let colorIncorrect2 = colorIncorrect;
    while (colorIncorrect2 === colorIncorrect || colorIncorrect === colorCorrect) {
        colorIncorrect = Math.floor(Math.random() * (colors[colorGroup].length));
    }
    colorN3.innerText = colors[colorGroup][colorIncorrect];
    applyColorToElement(colorGroup,colorCorrect);
    colorBlock.style.backgroundColor = colors[colorGroup][colorCorrect];
     if (lightColors.includes(colors[colorGroup]) || lightGreys.includes(colors[colorGroup][colorCorrect])) {
        body.style.backgroundColor = "black";
        colorOne.style.backgroundColor = "black";
        colorTwo.style.backgroundColor = "black";
        colorThree.style.backgroundColor = "black";
    } else {
        body.style.backgroundColor = "white";
        colorOne.style.backgroundColor = "white";
        colorTwo.style.backgroundColor = "white";
        colorThree.style.backgroundColor = "white";
    }
    colorOne.classList.remove("hidden");
    colorTwo.classList.remove("hidden");
    colorThree.classList.remove("hidden");
}

function answer(){
    let correctAnswer = colors[colorGroup][colorCorrect];
    colorOne.classList.add("hidden");
    colorTwo.classList.add("hidden");
    colorThree.classList.add("hidden");
    colorBlock.classList.add("hidden");
    startButton.classList.remove("hidden");
    instructions.classList.add("hidden");
    if (event.target.innerText === correctAnswer) {
        youWon.classList.remove("hidden");
        score += 1;
        totalCorrect += 1;
        totalGoes += 1;
        yourScore.innerText = "Your score is: " + score;
        console.log(timedMode);
        if (timedMode === false) {
            if (score > highscore) highscore = score;
            yourHighscore.innerText = "Your highscore is: " + highscore;
        }
        yourFraction.innerText = totalCorrect + "/" + totalGoes;
        yourPercentage.innerText = "Your correct percentage is: " + ((totalCorrect / totalGoes) * 100).toFixed(2) + "%";
    } else {
        youLost.classList.remove("hidden");
        yourAnswer.innerText = "You put: " + event.target.innerText;
        lostAnswer.innerText = "The answer was: " + correctAnswer;
        lostAnswer.style.color = correctAnswer;
        yourAnswer.style.color = event.target.innerText
        lostAnswer.classList.remove("hidden");
        yourAnswer.classList.remove("hidden");
        if (timedMode === false) score = 0;
        totalGoes += 1;
        yourScore.innerText = "Your score is: " + score;
        yourFraction.innerText = totalCorrect + "/" + totalGoes;
        yourPercentage.innerText = "Your correct percentage is: " + ((totalCorrect / totalGoes) * 100).toFixed(2) + "%";
    }
}

function quitToMainMenu(){
    quit.classList.add("hidden");
    colorOne.classList.add("hidden");
    colorTwo.classList.add("hidden");
    colorThree.classList.add("hidden");
    colorBlock.classList.add("hidden");
    instructions.classList.add("hidden");
    yourFraction.classList.add("hidden");
    yourPercentage.classList.add("hidden");
    yourScore.classList.add("hidden");
    yourHighscore.classList.add("hidden");
    timedHighscore.classList.add("hidden");
    time.classList.add("hidden");
    finalScore.classList.add("hidden");
    youWon.classList.add("hidden");
    youLost.classList.add("hidden");
    yourAnswer.classList.add("hidden");
    lostAnswer.classList.add("hidden");
    startButton.classList.remove("hidden");
    timedStart.classList.remove("hidden");
    score = 0;
    yourScore.innerText = "Your score is: 0";
    totalCorrect = 0;
    totalGoes = 0;
    yourFraction.innerText = "0/0";
    yourPercentage.innerText = "Your correct percentage is: 0%";
    timedMode = false;
    clearInterval(interval);
    count = false;
    startButton.innerText = "play regular mode";
    timedStart.innerText = "play timed mode";
}

function timeup(){
    colorOne.classList.add("hidden");
    colorTwo.classList.add("hidden");
    colorThree.classList.add("hidden");
    colorBlock.classList.add("hidden");
    youLost.classList.add("hidden");
    youWon.classList.add("hidden");
    time.classList.add("hidden");
    yourAnswer.classList.add("hidden");
    lostAnswer.classList.add("hidden");
    startButton.classList.add("hidden");
    instructions.classList.add("hidden");
    finalScore.classList.remove("hidden");
    timedStart.innerText = "retry";
    finalScore.innerText = "You scored: " + score;
    if (score > timedModeHighscore) timedModeHighscore = score;
    timedHighscore.innerText = "Your highscore in timed mode is: " + timedModeHighscore;
    setTimeout(() => {
        timedStart.classList.remove("hidden");
    }, 500);
    count = false;
}

function applyColorToElement(colorGroup,colorCorrect){
    const paragraphs = [colorOne, colorTwo, colorThree, instructions, yourScore, yourHighscore, yourFraction, yourPercentage, youLost, youWon, time, timedHighscore, finalScore];
    paragraphs.forEach(el => el.style.color = colors[colorGroup][colorCorrect]);
}